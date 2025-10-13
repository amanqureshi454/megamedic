import React, { useState, useRef } from "react";

const MobileVideoExpand = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    setIsExpanded(true);
    setMuted(false);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setPlaying(false);
    setMuted(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="relative block w-full md:hidden">
      {/* Thumbnail/Normal State - Mobile Only */}
      {!isExpanded && (
        <div className="relative mx-auto flex h-64 w-[85%] items-center justify-center overflow-hidden rounded-3xl md:hidden">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/new-main.mp4"
          />

          {/* Play Button Overlay */}
          <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <button
              id="home-reel-video-watch-btn"
              aria-label="Watch reel button"
              onClick={handlePlay}
            >
              <div id="home-reel-video-watch-btn-base"></div>
              <div id="home-reel-video-watch-btn-background"></div>
              <svg
                id="home-reel-video-watch-btn-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="none"
                viewBox="0 0 36 36"
              >
                <path
                  fill="currentColor"
                  d="M7 7.29c0-1.5 1.59-2.466 2.92-1.776l20.656 10.71c1.439.747 1.439 2.805 0 3.552L9.92 30.486C8.589 31.176 7 30.21 7 28.71V7.29Z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Modal Overlay - Mobile Only */}
      {isExpanded && (
        <>
          {/* Close Button - Outside Modal for z-index */}
          <button
            onClick={handleClose}
            className="fixed top-6 right-6 z-[102] rounded-full bg-[#2f855a] p-2 md:hidden"
          >
            <span>×</span>
          </button>

          <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black md:hidden">
            {/* Video Container */}
            <div className="relative h-auto max-h-screen w-full overflow-auto">
              <video
                ref={videoRef}
                className="h-auto max-h-screen w-full object-contain"
                controls
                autoPlay
                muted={muted}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              >
                <source src="/new-main.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileVideoExpand;
