import React from "react";
import { useContext, useState, useEffect } from "react";
import "./App.css";
import { DataContext } from "./DataContext";
import Filter from "./Filter";
import VideoDisplay from "./VideoDisplay";
import { colors } from "@mui/material";

const App = () => {
  const data = useContext(DataContext);
  console.log("data", data);
  const [videoData, setVideoData] = useState([]);
  const [filter1, setFilter1] = useState(null);
  const [filter2, setFilter2] = useState(null);
  const [filter1Label, setFilter1Label] = useState("Fidelity Label");
  const [filter2Label, setFilter2Label] = useState("Parent Strategy");

  const cleanOptions = (col) => {
    const cleaned = new Set();
    for (let i = 0; i < data.length; i++) {
      cleaned.add(data[i][col]);
    }
    console.log("cleaned options for", col, cleaned); // Debug print
    return Array.from(cleaned);
  };

  const filterData = (filter1, filter2) => {
    console.log("Filtering data with:", filter1, filter2); // Debug print
    if ( filter1===null && filter2===null){
      return [null];
    }
    let filteredData = data;
    if (filter1) {
      filteredData = filteredData.filter(
        (item) => item[filter1Label] == filter1
      );
    }
    if (filter2) {
      filteredData = filteredData.filter(
        (item) => item[filter2Label] === filter2
      );
    }
    console.log("filteredData:", filteredData); // Debug print
    return filteredData.map((item) => ({
      src: `./videos/${item["Video"]}`,
      description: item["Transcript"],
    }));
  };

  useEffect(() => {
    const updatedVideoData = filterData(filter1, filter2);
    setVideoData(updatedVideoData);
    console.log("updatedVideoData:", updatedVideoData); // Debug print
  }, [filter1, filter2, data]);

  const handleFilter1Change = (option) => {
    setFilter1(option);
  };

  const handleFilter2Change = (option) => {
    setFilter2(option);
  };

  return (
    <div>
      <h1 className="header">Filter Page</h1>
      <Filter
        label={filter1Label}
        options={cleanOptions(filter1Label)}
        onChange={handleFilter1Change}
      />
      <Filter
        label={filter2Label}
        options={cleanOptions(filter2Label)}
        onChange={handleFilter2Change}
      />
      <div className="results">
        <h2 className="header">Results</h2>
        {videoData.length === 0 && (
          <>
            <p>Your filter conbination have no match, try something else.</p>
            <p>
              this page developed by JL from
              <span style={{ color: "red" }}> 4</span>
              <span style={{ color: "green" }}>0</span>
              <span style={{ color: "blue" }}>4</span>
              <span>Nfound </span>
              with help of AI
            </p>
          </>
        )}
        {videoData[0] === null && (
          <>
            <p>Yselect from drop down menu above to see result</p>
          </>
        )}
        {videoData.length > 0 && videoData[0]!=null &&
          videoData.map((video, index) => (
            <VideoDisplay
              key={index}
              src={video.src}
              description={video.description}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
