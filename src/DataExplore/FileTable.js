import { React, useEffect, useState } from "react";
import "./FileTable.css";
import Filter from "./Filter/Filter";
import { BACKEND } from "../consts";
import { Table, message, Button } from "antd";
import { Content } from "antd/es/layout/layout";
import ProtectedRoute from "./protecter/validate";

const FileTable = () => {
  const [filterOptions, setFilterOptions] = useState([]);
  const [types, setTypes] = useState([]);
  const [currOption, setCurrOption] = useState("");
  const [videoData, setVideoData] = useState([]);
  const [tableColumns, setTableColumns] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false); // New state for download button loading

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        //fetch filter options
        let options = [];
        const response = await fetch(`${BACKEND}/api/distinct/Family`);
        const data = await response.json();
        options = data.distinctValues;
        console.debug(options);
        setFilterOptions(options);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }

      try {
        //fetch types
        let options = [];
        const response = await fetch(`${BACKEND}/api/distinct/Type`);
        const data = await response.json();
        options = data.distinctValues;
        console.debug(options);
        setTypes(options);
      } catch (error) {
        console.error("Error fetching Types", error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (option) => {
    console.debug(option);
    setCurrOption(option);
  };

  useEffect(() => {
    const updateTable = async () => {
      setVideoData([]);
      setTableColumns(new Set());
      types.map(async (type) => {
        const response = await fetch(`${BACKEND}/api/filter/deduplicate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Family: currOption,
            Type: type,
            GroupBy: "Session",
          }),
        });
        const data = await response.json();
        console.debug("fetch data:", data);
        if (data.videos) {
          const row = {};
          data.videos.map((item) => {
            const sessionNum = item["Session"];
            setTableColumns((oldValue) => {
              const newSet = new Set(oldValue);
              const addContent = {
                title: <div className="colunmTitle">Session {sessionNum}</div>,
                dataIndex: sessionNum,
                key: sessionNum,
                render: (sessionNum) => sessionNum ?? "N/A",
              };
              const exists = Array.from(newSet).some(
                (item) => item.key === addContent.key
              );
              !exists && newSet.add(addContent);
              return newSet;
            });
            row[sessionNum] = [
              <span key={type + sessionNum}>
                <a
                  key="spreadsheet"
                  href={`${BACKEND}/api/download?path=${encodeURIComponent(
                    `human_annotation/${item["Family"]}_${item["Type"]}/Session${sessionNum}.xlsx`
                  )}`}
                >
                  Spreasheet
                </a>
                <br />
                <a
                  key="video"
                  href={`${BACKEND}/api/download?path=${encodeURIComponent(
                    `human_annotation/${item["Family"]}_${item["Type"]}/Session${sessionNum}.MOV`
                  )}`}
                >
                  Video
                </a>
              </span>,
            ];
          });
          row[0] = type;
          setVideoData((oldValue) => [...oldValue, row]);
        }
      });
    };

    updateTable();
    setTableColumns((oldvalue) => {
      const newSet = new Set(oldvalue);
      newSet.add({
        title: <div className="colunmTitle">Type</div>,
        key: 0,
        dataIndex: 0,
      });
      return newSet;
    });
    console.debug("table colunm:", tableColumns);
    console.debug("video data:", videoData);
  }, [currOption]);

  //download all button
  const handleDownloadAll = async () => {
    // download all button
    setDownloadLoading(true);

    // 创建隐藏 a 标签模拟下载（无需 Fetch，避免内存加载大文件）
    const url = `${BACKEND}/api/download-all`; // 您的路由（假设 GET）
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "Train_test_split.zip"; // 可选：浏览器会使用后端 Content-Disposition，如果设置
    document.body.appendChild(a);
    a.click();
    a.remove(); // 清理

    message.success("Download started!");
    setDownloadLoading(false); // 无需等待，因为浏览器立即处理
  };

  return (
    <ProtectedRoute>
      <div style={{ position: "relative" }}>
        <Button
          className="downloadButton"
          type="primary"
          onClick={handleDownloadAll}
          loading={downloadLoading}
          style={{ marginBottom: 16 }} // Style for button
        >
          Download train test dataset
        </Button>
        <Filter
          label="Family"
          options={filterOptions}
          onChange={handleFilterChange}
          currOption={currOption}
        />
        {!currOption ? (
          <p style={{ textAlign: "center" }}>
            Select from drop down menu to see result
          </p>
        ) : loading ? (
          <p style={{ textAlign: "center" }}>Loading data...</p>
        ) : (
          <>
            <Table
              columns={Array.from(tableColumns).sort((a, b) => a.key - b.key)}
              dataSource={videoData}
            />
          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default FileTable;
