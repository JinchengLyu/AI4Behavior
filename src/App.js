import React from "react";
import { useContext, useState, useEffect } from "react";
import "./App.css";
import "./filter_result_table.css";
import { DataContext } from "./DataContext";
import Filter from "./Filter";
import VideoDisplay from "./VideoDisplay";

const App = () => {
  const data = useContext(DataContext);
  // console.debug("data", data); // Debug print
  const [videoData, setVideoData] = useState([]);
  const [filters, setFilters] = useState([null, null]);
  const filterLabels = ["Fidelity Label", "Parent Strategy"];
  const filterInit = [null, null];

  const cleanOptions = (col) => {
    const cleaned = new Set();
    for (let i = 0; i < data.length; i++) {
      cleaned.add(data[i][col]);
    }
    // console.debug("cleaned options for", col, cleaned); // Debug print
    return Array.from(cleaned);
  };

  const filterData = (filters) => {
    console.debug("Filtering data with:", filters); // Debug print

    const isFiltersInitial = filters.every(
      (filter, index) => filter === filterInit[index]
    );
    if (isFiltersInitial) {
      return [null];
    }

    let filteredData = data;
    for (let i = 0; i < filters.length; i++) {
      if (filters[i]) {
        console.debug(`Filtering on ${filterLabels[i]} with value ${filters[i]}`); // Debug print
        filteredData = filteredData.filter(
          (item) => item[filterLabels[i]] == filters[i]
        );
        console.debug("Intermediate filtered data:", filteredData); // Debug print
      }
    }
    console.debug("Final filteredData:", filteredData); // Debug print
    return filteredData.map((item) => ({
      src: `./videos/${item["Video"]}`,
      description: item["Transcript"],
    }));
  };

  useEffect(() => {
    const updatedVideoData = filterData(filters);
    setVideoData(updatedVideoData);
    // console.debug("updatedVideoData:", updatedVideoData); // Debug print
  }, [filters, data]);

  const handleFilterChange = (filterIndex) => {
    return (option) => {
      setFilters((prevFilters) => {
        const newFilters = [...prevFilters];
        newFilters[filterIndex] = option;
        console.debug("newFilters", newFilters); // Debug print
        return newFilters;
      })
      return filters[filterIndex];
    };
  };

  const DisplayFilters = () => {
    return filterLabels.map(
      (
        label,
        i // Assuming filterLabels is an array
      ) => (
        <Filter
          key={label}
          label={label}
          options={cleanOptions(label)}
          onChange={handleFilterChange(i)}
          currOption={filters[i]}
        />
      )
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
            <p>Select from drop down menu above to see result</p>
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
