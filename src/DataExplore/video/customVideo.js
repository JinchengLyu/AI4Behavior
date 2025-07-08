import React, { useRef } from 'react';
import { Player, ControlBar, PlaybackRateMenuButton } from 'video-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'video-react/dist/video-react.css'; // Import video-react styles

const VideoPlayerWithChapters = () => {
  const playerRef = useRef(null);

  // Define chapter markers (time in seconds and label)
  const chapters = [
    { time: 0, label: 'Intro' },
    { time: 30, label: 'Chapter 1' },
    { time: 60, label: 'Chapter 2' },
  ];

  // Jump to specific chapter
  const jumpToChapter = (time) => {
    if (playerRef.current) {
      playerRef.current.seek(time);
    }
  };

  // Handle state changes (optional, for custom slider sync)
  const handleStateChange = (state) => {
    // You can update a state here to sync with a custom slider if needed
    // console.log(state.currentTime);
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <Player
        ref={playerRef}
        src="http://localhost:4005/api/download?path=human_annotation%2FAL_Baseline%2FSection1.MOV" // Replace with your video URL
        autoPlay={false}
        onStateChange={handleStateChange}
      >
        <ControlBar autoHide={false}>
          <PlaybackRateMenuButton rates={[0.5, 1, 1.5, 2]} />
        </ControlBar>
      </Player>

      {/* Custom Chapter Navigation */}
      <div style={{ padding: '10px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {chapters.map((chapter) => (
            <button
              key={chapter.time}
              onClick={() => jumpToChapter(chapter.time)}
              style={{ cursor: 'pointer', padding: '5px 10px' }}
            >
              {chapter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerWithChapters;
