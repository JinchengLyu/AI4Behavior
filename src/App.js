import React from "react";
import { useContext, useState, useEffect } from "react";
import "./App.css";
import "./filter_result_table.css";
import Filter from "./Filter";
import VideoDisplay from "./VideoDisplay";
import SearchBox from "./searchBox";
import './consts';
import { BACKEND } from "./consts";

const App = () => {
  // console.debug("data", data); // Debug print
  const [videoData, setVideoData] = useState([]);
  const [filters, setFilters] = useState([null, null]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({});
  const searchLabel = "Transcript";
  const filterLabels = ["Fidelity Label", "Parent Strategy"];
  const filterInit = [null, null];


  useEffect(() => {
    const fetchFilterOptions = async () => {
        try {
            const options = {};
            for (const label of filterLabels) {
                const response = await fetch(`${BACKEND}/api/distinct/${label}`);
                const data = await response.json();
                options[label] = data.distinctValues;
            }
            setFilterOptions(options);
        } catch (error) {
            console.error('Error fetching filter options:', error);
        }
    };

    fetchFilterOptions();
}, []);

  const fetchFilteredData  = async (filters, searchQuery) => {
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
          "Fidelity Label": filters[0],
          "Parent Strategy": filters[1],
          "Transcript": searchQuery,
        }),
      });
      const data = await response.json();
      if (data.videos) {
        setVideoData(
          data.videos.map((item) => ({
            src: `${BACKEND}/videos/${item["Video"]}`,
            description: item["Transcript"],
          }))
        );
      } else {
        setVideoData([]);
      }
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  useEffect(() => {
    fetchFilteredData (filters, searchQuery);
    // console.debug("updatedVideoData:", updatedVideoData); // Debug print
  }, [filters, searchQuery]);

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
      <>
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
      </>
    );
  };

  const showVideo = () => {
    return (
      <table className="video-table">
        <thead>
          <tr>
            <th>Video</th>
            <th>Script</th>
          </tr>
        </thead>
        <tbody>
          {videoData.map((video, index) => (
            <VideoDisplay
              key={index}
              src={video.src}
              description={video.description}
            />
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1 className="header">AI4Behavior</h1>
      <DisplayFilters />
      <div className="results">
        <h2 className="header">Results</h2>
        {videoData.length === 0 && ( //message when dismatch
          <>
            <p>Your filter conbination have no match, try something else.</p>
            <p>
              this page developed by JL from
              <span style={{ color: "#FF0000" }}> 4</span>
              <span style={{ color: "#00FF00" }}>0</span>
              <span style={{ color: "#0000FF" }}>4</span>
              <span>Nfound </span>
              with help of AI
            </p>
          </>
        )}
        {videoData[0] === null && ( //message before any selection
          <>
            <p>Select from drop down menu or search from searchbox above to see result</p>
          </>
        )}
        {
          /*when a valid selection made*/
          videoData.length > 0 && videoData[0] != null && showVideo()
        }
      </div>
    </div>
  );
};

export default App;
