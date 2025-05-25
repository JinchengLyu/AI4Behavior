import React from "react";
import { Gallery } from "react-grid-gallery";

const PhotoGallary = ({ w, h, num }) => {
  const imgs = [
    { src: "/video_screenshots/1.png", width: w, height: h },
    { src: "/video_screenshots/2.png", width: w, height: h },
    { src: "/video_screenshots/3.png", width: w, height: h },
    { src: "/video_screenshots/4.png", width: w, height: h },
    { src: "/video_screenshots/5.png", width: w, height: h },
    { src: "/video_screenshots/6.png", width: w, height: h },
    { src: "/video_screenshots/7.png", width: w, height: h },
    { src: "/video_screenshots/8.png", width: w, height: h },
    { src: "/video_screenshots/9.png", width: w, height: h },
    { src: "/video_screenshots/10.png", width: w, height: h },
    { src: "/video_screenshots/11.png", width: w, height: h },
    { src: "/video_screenshots/12.png", width: w, height: h },
  ];

  function shuffleCopy(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  return (
    <div className="gallery-container">
      <Gallery
        images={shuffleCopy(imgs).slice(0, num)}
        enableImageSelection={false}
      />
    </div>
  );
};

export default PhotoGallary;
