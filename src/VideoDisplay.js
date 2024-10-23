import React from 'react';

const VideoDisplay = ({ src, description }) => {
    return (
        <>
            <div className="video-section">
                <video width="600" controls>
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <p>{description}</p>
            </div>
            <hr />
        </>
    );
};

export default VideoDisplay;
