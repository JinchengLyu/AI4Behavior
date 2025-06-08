import { React, useEffect, useState } from "react";
import Filter from "./Filter/Filter";
import { BACKEND } from "../consts";

const FileTable = () => {
  const [filterOptions, setFilterOptions] = useState([]);
  const [types, setTypes] = useState([]);
  const [currOption, setCurrOption] = useState("");
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        let options = [];
        const response = await fetch(`${BACKEND}/api/distinct/Family`);
        const data = await response.json();
        options = data.distinctValues;
        console.debug(options);
        setFilterOptions(options);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
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
    setCurrOption(option);
  };

  useEffect(() => {
    types.map(async (type) => {
      const response = await fetch(`${BACKEND}/api/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Family: currOption,
          Type: type,
        }),
      });
      const data = await response.json();
      if (data.videos) {
        setVideoData(
          data.videos.map((item) => ({
            id: item["Id"],
          }))
        );
      }
    });
  }, [currOption]);

  return (
    <>
      <Filter
        label="Family"
        options={filterOptions}
        onChange={handleFilterChange}
        currOption={currOption}
      />
    </>
  );
};

export default FileTable;
