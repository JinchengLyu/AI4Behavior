import React from "react";
import { useState, useEffect } from "react";
import "./DBFilter.css";
import Filter from "./Filter";
import SearchBox from "./searchBox";
import "../consts";
import { BACKEND } from "../consts";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DBFilter = () => {
  // console.debug("data", data); // Debug print
  const [videoData, setVideoData] = useState([]);
  const [filters, setFilters] = useState([null, null]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({});
    const [annotation, setAnnotation] = useState("");
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
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  const fetchFilteredData = async (filters, searchQuery) => {
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
          Transcript: searchQuery,
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
    fetchFilteredData(filters, searchQuery);
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

  const displayContent = () => {

    const handleSubmitAnnotation = () => {
      return;
    };

    return (
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
      >
        {videoData.map((video, index) => (
          <SwiperSlide key={index}>
            <div className="grid-container">
              <div className="left">
                <video controls>
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="right-top">{video.description}</div>
              <div className="right-bottom">
                <textarea
                className="annotation"
                  type="text"
                  placeholder="Annotation"
                  value={annotation}
                  onChange={(e) => setAnnotation(e.target.value)}
                />
                <button className="annotation" onClick={handleSubmitAnnotation}>Submit</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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
        videoData.length > 0 && videoData[0] != null && displayContent()
      }
    </>
  );
};

export default DBFilter;
