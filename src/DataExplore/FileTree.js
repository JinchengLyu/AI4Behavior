// SimpleFileTree.jsx
import React, { useState, useEffect } from "react";

const FileNode = ({ name, path, isFolder, children, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = async () => {
    if (!isExpanded && isFolder) {
      // 动态加载子节点
      try {
        const url = new URL("/api/files", window.location.origin);
        url.searchParams.set("path", path);
        const res = await fetch(url);
        children = await res.json();
      } catch (err) {
        console.error("加载失败:", err);
      }
    }
    setIsExpanded(!isExpanded);
  };

  const handleDownload = async () => {
    const url = new URL("/api/download", window.location.origin);
    url.searchParams.set("path", `${path}/${name}`);
    const res = await fetch(url);
    const blob = await res.blob();
    // ...同之前的下载逻辑
  };

  return (
    <div style={{ marginLeft: depth * 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {isFolder ? (
          <button onClick={handleToggle}>{isExpanded ? "▼" : "▶"} 📁</button>
        ) : (
          <span>📄</span>
        )}
        <span>{name}</span>
        {!isFolder && (
          <button onClick={handleDownload} style={{ marginLeft: 10 }}>
            下载
          </button>
        )}
      </div>
      {isExpanded &&
        children?.map((child, index) => (
          <FileNode
            key={index}
            {...child}
            depth={depth + 1}
            path={`${path}/${child.name}`}
          />
        ))}
    </div>
  );
};

const SimpleFileTree = () => {
  const [rootNodes, setRootNodes] = useState([]);

  // 初始化加载根目录
  useEffect(() => {
    fetch("/files?path=")
      .then((res) => res.json())
      .then((data) => setRootNodes(data));
  }, []);

  return (
    <div>
      {rootNodes.map((node, index) => (
        <FileNode key={index} {...node} path="" depth={0} />
      ))}
    </div>
  );
};

export default SimpleFileTree