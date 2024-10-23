import React, { useContext, useState } from "react";
import { DataContext } from "./DataContext";
import Filter from './Filter';
import VideoDisplay from './VideoDisplay';

const DataViewer = () => {
    const data = useContext(DataContext);
    console.log("data", data);
    const [videoData, setVideoData] = useState([]);
    const [filter1, setFilter1] = useState(null);
    const [filter2, setFilter2] = useState(null);
    const [filter1Label, setFilter1Label] = useState("Fidelity Label");  // Fix typo
    const [filter2Label, setFilter2Label] = useState("Parent Strategy");  // Fix typo

    const cleanOptions = (col) => {
        const cleaned = new Set();
        for (let i = 0; i < data.length; i++) {
            cleaned.add(data[i][col]);
        }
        // console.log("cleaned", cleaned);
        return Array.from(cleaned);
    };

    const handleFilter1Click = (option) => {
        setFilter1(option);
        const filteredData = data.filter(item => item[filter1Label] === option);
        const updatedVideoData = filteredData.map(item => ({
            src: `./AI4BehaviourDataSet/videos/${item["Video"]}`,
            description: item["Transcript"],
        }));
        setVideoData(updatedVideoData);
        console.log(updatedVideoData);
    };

    const handleFilter2Click = (option) => {
        setFilter2(option);
        // Logic to update results based on filter2
    };

    return (
        <div>
            <h1>Filter Page</h1>
            <Filter
                label={filter1Label}
                options={cleanOptions(filter1Label)}
                onClick={handleFilter1Click}
            />
            <Filter
                label={filter2Label}
                options={cleanOptions(filter2Label)}
                onClick={handleFilter2Click}
            />
            <div className="results">
                <h2>Results</h2>
                <p>Filtered results will be displayed here based on the selected filters.</p>
                {Array.isArray(videoData) && videoData.map((video, index) => (
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

export default DataViewer;
