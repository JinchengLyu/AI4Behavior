import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DisplayContent = ({ videoData, dataChanged, setDataChange }) => {
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  const [CurrIndex, setCurrIndex] = useState(0);

  const handleSlideChange = () => {
    const swiper = swiperRef.current;
    setCurrIndex(swiper.activeIndex);
  };

  useEffect(() => {
    // Set video source when the swiper index changes
    if (videoRefs.current[CurrIndex]) {
      //fetch prev
      CurrIndex - 1 >= 0 && //if not out of bound
        videoRefs.current[CurrIndex - 1].src !== videoData[CurrIndex - 1].src && //if not loaded proviously
        (videoRefs.current[CurrIndex - 1].src = videoData[CurrIndex - 1].src);

      //fetch curr
      videoRefs.current[CurrIndex].src !== videoData[CurrIndex].src && //if not loaded proviously
        (videoRefs.current[CurrIndex].src = videoData[CurrIndex].src) &&
        console.log("loading curr");

      //fetch next
      CurrIndex + 1 < videoData.length && //if not out of bound
        videoRefs.current[CurrIndex + 1].src !== videoData[CurrIndex + 1].src && //if not loaded proviously
        (videoRefs.current[CurrIndex + 1].src = videoData[CurrIndex + 1].src);
    }
  }, [CurrIndex, videoData]);

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true, type: "fraction" }}
      modules={[Navigation, Pagination]}
      onSlideChange={handleSlideChange}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
    >
      {videoData.map((video, index) => (
        <SwiperSlide key={index + video.src}>
          <div className="grid-container">
            <div className="left">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                controls
                muted
              />
            </div>
            <div className="right-top">
              <p className="transcript-label">transcript:</p>
              <p>{video.description}</p>
            </div>
            <div className="right-bottom">
              <p>Fidelity: {video.fidelity}</p>
              <p>Parent Stratagy: {video.stratagy}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DisplayContent;
