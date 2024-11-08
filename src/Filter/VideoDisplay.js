import React from "react";
import './VideoDisplay.css'

const VideoDisplay = ({ src, description }) => {
  return (
    <>
      <tr className="video-section">
        <td>
          <video controls>
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </td>
        <td className="videoScript">{description}</td>
      </tr>
    </>
  );
};

export default VideoDisplay;
