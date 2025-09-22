import React, { useEffect, useState } from "react";
import { BACKEND } from "./consts";
import ProtectedRoute from "./protecter/validate";

// API 基础地址（Base URL）
const API_BASE = BACKEND;

// 端点 Endpoints
const APPS_ENDPOINT = `${BACKEND}/api/applications`;
const GENERATE_ENDPOINT = `${BACKEND}/api/generate-passcode`;
// 如果你的路由挂在 /api 下，请改为：
// const GENERATE_ENDPOINT = `${BACKEND}/api/generate-passcode`;

/**
 * 获取申请列表（Fetch applications list）
 */
async function getApplications() {
  const res = await fetch(APPS_ENDPOINT);
  if (!res.ok) {
    const msg = await safeText(res);
    throw new Error(msg || "加载申请失败（Failed to load applications）");
  }
  return res.json();
}

/**
 * 生成通行码（Generate passcode）
 * 默认将输入值作为 userId 传给后端；若后端也支持 email，可改成依据 @ 判断用 { email }。
 */
async function generatePasscode(key) {
  const body = { userId: key };
  // 如果你的后端支持 email，也可以用：
  // const body = key.includes('@') ? { email: key } : { userId: key };

  const res = await fetch(GENERATE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      data.error || "生成通行码失败（Failed to generate passcode）"
    );
  }
  return data; // 期望 { passcode, ... }
}

/**
 * 安全读取文本（Safe read text）
 */
async function safeText(res) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

/**
 * 管理页面（Admin Page）：申请审核 Applications Review + 生成通行码 Passcode
 */
export default function ApplicationsAdmin() {
  // 状态（State）
  const [apps, setApps] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [query, setQuery] = useState(""); // 输入 userId 或 email
  const [submitting, setSubmitting] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  // 加载申请列表（Load applications）
  useEffect(() => {
    (async () => {
      try {
        setLoadingApps(true);
        const list = await getApplications();
        setApps(Array.isArray(list) ? list : []);
      } catch (e) {
        setError(e.message || "加载申请失败");
      } finally {
        setLoadingApps(false);
      }
    })();
  }, []);

  // 选中一条申请（Pick one application）
  const onPick = (app) => {
    const key = app.userId || app.email || "";
    setQuery(key);
    setPasscode("");
    setError("");
  };

  // 生成通行码（Generate passcode）
  const onGenerate = async () => {
    const key = query.trim();
    if (!key) return;
    setSubmitting(true);
    setPasscode("");
    setError("");
    try {
      const { passcode: code } = await generatePasscode(key);
      setPasscode(code);
    } catch (e) {
      setError(e.message || "生成失败");
    } finally {
      setSubmitting(false);
    }
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 兜底 fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  return (
    <ProtectedRoute requiredLevel={5}>
    <div
      style={{
        padding: 16,
        maxWidth: 760,
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
      }}
    >
      <h2> Review</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Input email"
          style={{
            flex: 1,
            padding: 8,
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        />
        <button
          onClick={onGenerate}
          disabled={!query.trim() || submitting}
          style={{ padding: "8px 12px" }}
        >
          {submitting ? "Generating..." : "Generate passcode"}
        </button>
      </div>

      {passcode && (
        <div style={{ marginBottom: 12 }}>
          Passcode <b style={{ fontSize: 18 }}>{passcode}</b>
          <button onClick={() => copy(passcode)} style={{ marginLeft: 8 }}>
            Copy
          </button>
        </div>
      )}
      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

      <h3 style={{ marginTop: 24 }}>Applications</h3>
      {loadingApps ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          {apps.length === 0 ? (
            <div style={{ padding: 12, color: "#666" }}>暂无数据 No Data</div>
          ) : (
            apps.map((app, idx) => (
              <div
                key={idx}
                onClick={() => onPick(app)}
                style={{
                  padding: 10,
                  borderBottom: "1px solid #f0f0f0",
                  cursor: "pointer",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                }}
                title="Click to fill input"
              >
                <div>
                  <div>
                    <b>{app.name}</b> - {app.email}
                  </div>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    purpose: {app.purpose} | agreed:{" "}
                    {String(app.disclaimerAgreed)}
                  </div>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    createdAt:{" "}
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleString()
                      : "-"}
                  </div>
                </div>
                <button>选择 Select</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
