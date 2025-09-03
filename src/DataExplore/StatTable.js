import React, { useEffect, useState } from "react";
import { BACKEND, filterLabels } from "../consts";
import "./StatTable.css";

const StatTable = () => {
  const [field1Values, setField1Values] = useState([]);
  const [field2Values, setField2Values] = useState([]);
  const [stats, setStats] = useState({});
  const [ready, setReady] = useState(false); // 数据就绪标记 ready flag
  const [loading, setLoading] = useState(true); // 可选：加载状态 loading state

  useEffect(() => {
    let cancelled = false; // 取消标记 cancellation flag

    async function loadAll() {
      setReady(false);
      setLoading(true);

      try {
        // 1) 并发获取两列的去重值 distinct values
        const [f1Res, f2Res] = await Promise.all([
          fetch(`${BACKEND}/api/distinct/${filterLabels[0]}`).then((r) => r.json()),
          fetch(`${BACKEND}/api/distinct/${filterLabels[1]}`).then((r) => r.json()),
        ]);

        // 兼容：后端返回结构假设为 { distinctValues: [...] }
        let f1 = Array.isArray(f1Res?.distinctValues) ? f1Res.distinctValues : [];
        let f2 = Array.isArray(f2Res?.distinctValues) ? f2Res.distinctValues : [];

        // 追加“汇总 Summary”列/行，用空字符串 "" 作为键 key，避免重复添加
        if (!f1.includes("")) f1 = [...f1, ""];
        if (!f2.includes("")) f2 = [...f2, ""];

        if (cancelled) return;
        setField1Values(f1);
        setField2Values(f2);

        // 2) 组合所有 (value1, value2) 并发获取统计值 counts
        const combos = [];
        for (const v1 of f1) {
          for (const v2 of f2) {
            combos.push({ v1, v2 });
          }
        }

        const results = await Promise.all(
          combos.map(async ({ v1, v2 }) => {
            try {
              const res = await fetch(`${BACKEND}/api/count`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  field1: filterLabels[0],
                  value1: v1,
                  field2: filterLabels[1],
                  value2: v2,
                }),
              });
              if (!res.ok) {
                console.error("Error fetching count:", res.status, res.statusText);
                return { v1, v2, count: undefined };
              }
              const data = await res.json();
              return { v1, v2, count: data?.count };
            } catch (e) {
              console.error("Network error fetching count:", e);
              return { v1, v2, count: undefined };
            }
          })
        );

        if (cancelled) return;

        // 3) 组装 stats 为二维映射 map
        const tempStats = {};
        for (const { v1, v2, count } of results) {
          if (!tempStats[v1]) tempStats[v1] = {};
          tempStats[v1][v2] = count;
        }
        setStats(tempStats);

        // 4) 全部完成，设置 ready
        setReady(true);
      } catch (e) {
        console.error("Error loading data:", e);
        // 如果出错，不显示表格，保持 ready=false
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAll();
    return () => {
      cancelled = true;
    };
  }, []); // filterLabels/BACKEND 为常量（const），可安全保持空依赖

  // 仅当 ready 为 true 才渲染表格
  return (
    <>
      {!ready && (
        <div className="stat-loading">
          {loading ? "Loading..." : "Data not ready"}
        </div>
      )}

      {ready && (
        <table border="1">
          <thead>
            <tr>
              <th rowSpan="2">{filterLabels[0]}</th>
              <th colSpan={field2Values.length}>{filterLabels[1]}</th>
            </tr>
            <tr>
              {field2Values.map((value) => (
                <th key={`col-${value === "" ? "summary" : value}`}>
                  {value === "" ? "Summary" : value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {field1Values.map((value1) => (
              <tr key={`row-${value1 === "" ? "summary" : value1}`}>
                <th>{value1 === "" ? "Summary" : value1}</th>
                {field2Values.map((value2) => (
                  <td key={`cell-${value1 || "summary"}-${value2 || "summary"}`}>
                    {stats[value1] && stats[value1][value2]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default StatTable;
