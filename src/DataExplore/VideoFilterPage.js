import React, { useState, useEffect } from "react";
import Filter from "./Filter"; // 使用您提供的Filter组件
import "./VideoFilterPage.css";
import { BACKEND } from "../consts";

const VideoFilterPage = () => {
  // 状态管理
  const [filters, setFilters] = useState({ family: null });
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [error, setError] = useState(null);
  const [familyOptions, setFamilyOptions] = useState([]);

  // 获取Family选项
  const fetchFamilyOptions = async () => {
    setIsLoadingOptions(true);
    try {
      const response = await fetch(BACKEND + "/api/distinct/Family");
      if (!response.ok) {
        throw new Error("Failed to fetch family options");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // 确保选项不为空且去重
      const uniqueOptions = data.distinctValues;
      setFamilyOptions(uniqueOptions);
    } catch (err) {
      console.error("Error fetching family options:", err);
      setError(`Failed to load family options: ${err.message}`);
    } finally {
      setIsLoadingOptions(false);
    }
  };

  // 获取视频数据
  const fetchVideos = async (filterParams = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(BACKEND + "/api/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterParams),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setVideos(data.videos || []);
      setFilteredVideos(data.videos || []);
    } catch (err) {
      setError(err.message);
      setVideos([]);
      setFilteredVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始加载数据
  useEffect(() => {
    const initializeData = async () => {
      await fetchFamilyOptions();
      fetchVideos();
    };

    initializeData();
  }, []);

  // 应用过滤器
  const applyFilters = () => {
    // 构建有效过滤参数
    const filterParams = {};
    if (filters.family !== null) {
      filterParams.family = filters.family;
    }

    // 如果有过滤条件则发送请求
    if (Object.keys(filterParams).length > 0) {
      fetchVideos(filterParams);
    } else {
      // 没有过滤条件时显示所有数据
      fetchVideos();
    }
  };

  // 处理过滤器变更
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // 重置所有过滤器
  const resetFilters = () => {
    setFilters({ family: null });
    fetchVideos();
  };

  return (
    <div className="video-page-container">
      <header className="video-page-header">
        <h1>Video Library</h1>
        <p>Filter and manage your video collection</p>
      </header>

      <div className="video-controls-section">
        <div className="video-filters-header">
          <h2>Filter by Family</h2>
          <div className="video-filters-actions">
            <button
              className="video-reset-btn"
              onClick={resetFilters}
              disabled={filters.family === null}
            >
              Reset Filter
            </button>
          </div>
        </div>

        <div className="video-filter-row">
          {isLoadingOptions ? (
            <div className="options-loading">
              <div className="loading-spinner small"></div>
              Loading family options...
            </div>
          ) : error ? (
            <div className="options-error">
              {console.log(error)}
              ⚠️ Failed to load options
            </div>
          ) : (
            <>
              <Filter
                label="Family"
                options={familyOptions}
                currOption={filters.family}
                onChange={(value) => handleFilterChange("family", value)}
              />
              <button
                className="video-apply-btn"
                onClick={applyFilters}
                disabled={filters.family === null}
              >
                Apply Filter
              </button>
            </>
          )}
        </div>
      </div>

      <div className="video-results-section">
        <div className="video-results-header">
          <h2>Video Results</h2>
          <div className="video-results-count">
            Showing {filteredVideos.length} videos
          </div>
        </div>

        {isLoading ? (
          <div className="video-loading-state">
            <div className="video-spinner"></div>
            Loading video data...
          </div>
        ) : error ? (
          <div className="video-error-state">
            <div className="error-icon">⚠️</div>
            <h3>Error Loading Videos</h3>
            <p>{error}</p>
            <button className="video-retry-btn" onClick={() => fetchVideos()}>
              Retry
            </button>
          </div>
        ) : (
          <div className="video-table-container">
            {filteredVideos.length > 0 ? (
              <table className="video-data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Session</th>
                    <th>Family</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVideos.map((video) => (
                    <tr key={video.id}>
                      <td>{video.id}</td>
                      <td>{video.title}</td>
                      <td>{video.type}</td>
                      <td>{video.session}</td>
                      <td>{video.family}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="video-empty-state">
                <div className="video-empty-icon">🎬</div>
                <h3>No videos found</h3>
                <p>Try adjusting your filter or resetting it</p>
                <button className="video-reset-btn" onClick={resetFilters}>
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoFilterPage;
