// src/components/FileTree.js
import React, { useState, useEffect } from 'react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css'; // 引入默认样式
import { Button } from 'antd'; // 使用 antd 的 Button 组件（可选）
import axios from 'axios';
import { BACKEND } from '../consts';

const FileTree = () => {
  const [treeData, setTreeData] = useState([]);

  // 获取文件树数据
  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await axios.get(BACKEND+'/api/files');
        // 将后端数据转换为 rc-tree 所需的格式
        const formattedData = formatTreeData(response.data);
        setTreeData(formattedData);
      } catch (error) {
        console.error('获取文件树失败:', error);
      }
    };
    fetchTreeData();
  }, []);

  // 转换数据格式以适配 rc-tree
  const formatTreeData = (data) => {
    return data.map((node) => ({
      key: node.path,
      title: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: 8 }}>
            {node.type === 'folder' ? '📁' : '📄'}
          </span>
          <span>{node.name}</span>
          {node.type === 'file' && (
            <Button
              type="primary"
              size="small"
              style={{ marginLeft: 16 }}
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(node.path);
              }}
            >
              Download
            </Button>
          )}
        </div>
      ),
      children: node.children ? formatTreeData(node.children) : [],
    }));
  };

  // 处理文件下载
  const handleDownload = async (filePath) => {
    try {
      const response = await axios.get(BACKEND+`/api/download?path=${filePath}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filePath.split('/').pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('下载文件失败:', error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>文件树 (File Tree)</h2>
      {treeData.length > 0 ? (
        <Tree
          treeData={treeData}
          defaultExpandAll={false}
          showLine
          style={{ width: 400 }}
        />
      ) : (
        <p>加载中...</p>
      )}
    </div>
  );
};

export default FileTree;
