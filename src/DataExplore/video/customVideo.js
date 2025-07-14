import React, { useRef, useState, useEffect } from "react";
import { Player, ControlBar, PlaybackRateMenuButton } from "video-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "video-react/dist/video-react.css";
import "./videoPlayer.css"; // Import custom CSS if you have it

const VideoPlayerWithChapters = ({ chapters, videoSrc, showButton }) => {
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const marks = chapters.reduce((acc, chapter) => {
    acc[chapter.time] = chapter.label;
    return acc;
  }, {});

  // Subscribe to state changes for syncing time
  useEffect(() => {
    if (playerRef.current) {
      // Subscribe to state changes in video-react
      const unsubscribe = playerRef.current.subscribeToStateChange((state) => {
        setCurrentTime(state.currentTime || 0);
        if (state.duration && state.duration !== duration) {
          setDuration(state.duration);
        }
      });

      // Handle video loaded metadata to get initial duration
      playerRef.current.video.video.addEventListener("loadedmetadata", () => {
        setDuration(playerRef.current.getState().player.duration);
      });

      return () => unsubscribe(); // Clean up subscription
    }
  }, [duration]);

  // Handle slider change to seek video
  const handleSliderChange = (value) => {
    if (playerRef.current) {
      playerRef.current.seek(value);
      setCurrentTime(value);
    }
  };

  // Jump to chapter
  const jumpToChapter = (time) => {
    if (playerRef.current) {
      playerRef.current.seek(time);
      setCurrentTime(time);
    }
  };

  return (
    <div className="video-player-container">
      <Player
        ref={playerRef}
        src={videoSrc} // Replace with your actual video URL
        autoPlay={false}
      >
        <ControlBar autoHide={false} disableDefaultControls={true}>
          <PlaybackRateMenuButton rates={[0.5, 1, 1.5, 2]} />
        </ControlBar>
      </Player>

      {/* Custom Slider with Chapters */}
      <div className="custom-slider">
        <Slider
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSliderChange}
          marks={marks}
          step={0.1}
          disabled={duration === 0} // Disable slider until duration is loaded
        />
      </div>

      {/* Chapter Buttons */}
      {showButton && <div className="chapter-buttons">
        {chapters.map((chapter) => (
          <button
            key={chapter.time}
            onClick={() => jumpToChapter(chapter.time)}
          >
            {chapter.label}
          </button>
        ))}
      </div>}
    </div>
  );
};

export default VideoPlayerWithChapters;
