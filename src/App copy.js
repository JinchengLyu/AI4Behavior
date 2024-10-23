import React, { useContext, useState } from 'react';
import './App.css';
import {DataContext} from './DataContext';
import Filter from './Filter';
import VideoDisplay from './VideoDisplay';

const App = () => {
  const data = useContext(DataContext);
  console.log("data",data);
  const [videoData, setVideoData] = useState();
  const [filter1, setFilter1] = useState();
  const [filter2, setFilter2] = useState();
  const [filter1Labal, setFilter1Label] = useState();
  const [filter2Labal, setFilter2Label] = useState();
  setFilter1Label("Fidelity Label");
  setFilter2Label("Parent Strategy");

    const cleanOptions = (col)=>{
      const cleaned=new Set();
      for (let i=0; i<data.length;i++){
        cleaned.add(data[i][col]);
      }
      console.log("cleaned",cleaned);
      return Array.from(cleaned);
    }

    const handleFilter1Click = (option) => {
        setFilter1(option);
        setVideoData([])
        for (let i=0;i<data.length;i++){
          if (data[i][filter1Labal]===option){
            setVideoData(videoData+[{
              src: "./AI4BehaviourDataSet/videos"+data[i]["Video"],
              description: data[i]["Transcript"],
            }])
          }
        }
        console.log(videoData);
    };

    const handleFilter2Click = (option) => {
        setFilter2(option);
        // Logic to update results based on filter2
    };

    return (
        <div className="App">
            <h1>Filter Page</h1>
            <Filter
                label={filter1Labal}
                options={cleanOptions(filter1Labal)}
                onClick={handleFilter1Click}
            />
            <Filter
                label={filter2Labal}
                options={cleanOptions(filter2Labal)}
                onClick={handleFilter2Click}
            />
            <div className="results">
                <h2>Results</h2>
                <p>Filtered results will be displayed here based on the selected filters.</p>
                {videoData.map((video, index) => (
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
