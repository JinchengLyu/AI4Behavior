import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { BACKEND } from "../consts";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DisplayContent = ({ videoData, dataChanged, setDataChange }) => {
  const swiperRef = useRef(null);
  const [annotation, setAnnotation] = useState("");
  const [CurrIndex, setCurrIndex] = useState(0);

  const handleSubmitAnnotation = async () => {
    try {
      const response = await fetch(`${BACKEND}/api/update-transcript`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          annotation: annotation,
          id: videoData[CurrIndex].id,
        }),
      });
      if (response.status == 200) {
        setDataChange(!dataChanged);
      }
    } catch {
      console.error("transcript update failed");
    }
    return;
  };

  const handleSlideChange = () => {
    const swiper = swiperRef.current;
    setCurrIndex(swiper.activeIndex);
    setAnnotation("");
  };

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      onSlideChange={handleSlideChange}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
    >
      {videoData.map((video, index) => (
        <SwiperSlide key={index+video.src}>
          <div className="grid-container">
            <div className="left">
              <video controls muted>
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="right-top">{video.description}</div>
            <div className="right-bottom">
              <textarea
                key={index}
                className="annotation"
                type="text"
                placeholder="Annotation"
                value={annotation}
                onChange={(e) => setAnnotation(e.target.value)}
              />
              <button className="annotation" onClick={handleSubmitAnnotation}>
                Submit
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DisplayContent;
