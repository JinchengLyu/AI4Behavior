// src/components/FileTree.js
import React, { useState, useEffect } from 'react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import { Button } from 'antd'; // 可选，如果不使用 antd，可以用原生 button
import axios from 'axios';
import {BACKEND} from "../consts"

const FileTree = () => {
  const [treeData, setTreeData] = useState([]);

  // 获取文件树数据
  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await axios.get(BACKEND+'/api/files');
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
          <Button
            type="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(node.path);
            }}
          >
            下载
          </Button>
        </div>
      ),
      children: node.children ? formatTreeData(node.children) : [],
    }));
  };

  // 处理文件或文件夹下载
  const handleDownload = async (itemPath) => {
    try {
      const response = await axios.get(`${BACKEND}/api/download?path=${itemPath}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', itemPath.split('/').pop() + (itemPath.includes('.') ? '' : '.zip'));
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('下载失败:', error);
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
