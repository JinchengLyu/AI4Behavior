import React from "react";
import { useState, useEffect, useCallback } from "react";
import "./DBFilter.css";
import Filter from "./Filter";
import SearchBox from "./searchBox";
import { BACKEND, filterLabels } from "../../consts.js";
import DisplayContent from "./DisplayContent";

const DBFilter = () => {
  // console.debug("data", data); // Debug print
  const [videoData, setVideoData] = useState([]);
  const [filters, setFilters] = useState([null, null]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({});
  const [dataChanged, setDataChange] = useState(false);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const options = {};
        for (const label of filterLabels) {
          const response = await fetch(`${BACKEND}/api/distinct/${label}`);
          const data = await response.json();
          options[label] = Number.isInteger(data.distinctValues[0])
            ? data.distinctValues.sort((a, b) => a - b)
            : data.distinctValues.sort();
        }
        setFilterOptions(options);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  const fetchFilteredData = useCallback(async (filters, searchQuery) => {
    const filterInit = [null, null];
    try {
      const isFiltersInitial = filters.every(
        (filter, index) => filter === filterInit[index]
      );
      if (isFiltersInitial && searchQuery === "") {
        console.log("filtering with specal case");
        setVideoData([null]);
        return;
      }
      const response = await fetch(`${BACKEND}/api/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Fidelity: filters[0], //if DB format change check here (CHECK)
          Parent_Strategy: filters[1], //if DB format change check here (CHECK)
          matched_transcript: searchQuery,
        }),
      });
      const data = await response.json();
      if (data.videos) {
        setVideoData(
          data.videos.map((item) => ({
            id: item["Id"],
            src: `${BACKEND}/videos/${item["Clip_Name"]}`,
            description: item["matched_transcript"],
            fidelity: item["Fidelity"],
            stratagy: item["Parent_Strategy"],
          }))
        );
      } else {
        setVideoData([]);
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  }, []);

  useEffect(() => {
    fetchFilteredData(filters, searchQuery);
    // console.debug("updatedVideoData:", updatedVideoData); // Debug print
  }, [fetchFilteredData, dataChanged, filters, searchQuery]);

  const handleFilterChange = (filterIndex) => {
    return (option) => {
      setFilters((prevFilters) => {
        const newFilters = [...prevFilters];
        newFilters[filterIndex] = option;
        console.debug("newFilters", newFilters); // Debug print
        return newFilters;
      });
      return filters[filterIndex];
    };
  };

  const handleSubmit = (query) => {
    console.debug(`query ${query}`);
    setSearchQuery(query);
  };

  const DisplayFilters = () => {
    return (
      //layout it differently
      <div className="filter">
        {filterLabels.map(
          (
            label,
            i // Assuming filterLabels is an array
          ) => (
            <Filter
              key={label}
              label={label}
              options={filterOptions[label] || [null]}
              onChange={handleFilterChange(i)}
              currOption={filters[i]}
            />
          )
        )}
        <SearchBox onSearch={handleSubmit} initSearchVal={searchQuery} />
      </div>
    );
  };

  return (
    <>
      {DisplayFilters()}
      {videoData.length === 0 && ( //message when dismatch
        <div style={{ textAlign: "center" }}>
          <p>Your filter conbination have no match, try something else.</p>
          <p>
            this page developed by JL from
            <span style={{ color: "#FF0000" }}> 4</span>
            <span style={{ color: "#00FF00" }}>0</span>
            <span style={{ color: "#0000FF" }}>4</span>
            <span>Nfound </span>
            with help of AI
          </p>
        </div>
      )}
      {videoData[0] === null && ( //message before any selection
        <>
          <p style={{ textAlign: "center" }}>
            Select from drop down menu or search from searchbox above to see
            result
          </p>
        </>
      )}
      {
        /*when a valid selection made*/
        videoData.length > 0 && videoData[0] != null && (
          <DisplayContent
            videoData={videoData}
            dataChanged={dataChanged}
            setDataChange={setDataChange}
          />
        )
      }
    </>
  );
};

export default DBFilter;
