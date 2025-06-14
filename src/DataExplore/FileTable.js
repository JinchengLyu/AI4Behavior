import { React, useEffect, useState } from "react";
import "./FileTable.css"
import Filter from "./Filter/Filter";
import { BACKEND } from "../consts";
import { Table } from "antd";
import { Content } from "antd/es/layout/layout";

const FileTable = () => {
  const [filterOptions, setFilterOptions] = useState([]);
  const [types, setTypes] = useState([]);
  const [currOption, setCurrOption] = useState("");
  const [videoData, setVideoData] = useState([]);
  const [tableColunms, setTableColunms] = useState(new Set());

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
      setTableColunms(new Set());
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
        if (data.videos) {
          const row = {};
          data.videos.map((item) => {
            const sessionNum= item["Session"]
            setTableColunms((oldValue) => {
              const newSet = new Set(oldValue);
              const addContent = {
                title: (<div className="colunmTitle">Session {sessionNum}</div>),
                dataIndex: sessionNum,
                key: sessionNum,
                render: (sessionNum) => sessionNum ?? 'N/A'
              };
              const exists = Array.from(newSet).some(
                (item) => item.key === addContent.key
              );
              !exists && newSet.add(addContent);
              return newSet;
            });
            row[sessionNum] = [
              <span key={type+sessionNum}>
                <a
                  key="spreadsheet"
                  href={`${BACKEND}/api/download?path=${encodeURIComponent(
                    `human_annotation/${item["Family"]}_${item["Type"]}/Section${sessionNum}.xlsx`
                  )}`}
                >
                  Spreasheet
                </a>
                <br />
                <a
                  key="video"
                  href={`${BACKEND}/api/download?path=${encodeURIComponent(
                    `human_annotation/${item["Family"]}_${item["Type"]}/Section${sessionNum}.MOV`
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
    setTableColunms((oldvalue) => {
      const newSet = new Set(oldvalue);
      newSet.add({ title: (<div className="colunmTitle">Type</div>), key: 0, dataIndex: 0 });
      return newSet;
    });
    console.debug("table colunm:", tableColunms);
    console.debug("video data:", videoData);
  }, [currOption]);

  return (
    <div>
      <Filter
        label="Family"
        options={filterOptions}
        onChange={handleFilterChange}
        currOption={currOption}
      />
      {!currOption && ( //message before any selection
        <>
          <p style={{ textAlign: "center" }}>
            Select from drop down menu to see
            result
          </p>
        </>
      )}
      {//if have select and option
      currOption && <Table
        columns={Array.from(tableColunms).sort((a, b) => a.key - b.key)}
        dataSource={videoData}
      />}
    </ div>
  );
};

export default FileTable;
