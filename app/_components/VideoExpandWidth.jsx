import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoExpandWidth = () => {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [play, setPlay] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  // GSAP expand + overlay animation
  useEffect(() => {
    const video = videoRef.current;
    const overlay = overlayRef.current;
    if (!video || !overlay) return;

    if (isVisible) {
      // expand + show overlay
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onStart: () => (overlay.style.pointerEvents = "auto"),
      });

      gsap.to(video, {
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          video.play();
          setPlay(true);
          video.muted = muted;
        },
      });
    } else {
      // shrink + hide overlay
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => (overlay.style.pointerEvents = "none"),
      });

      gsap.to(video, {
        // width: "55vw",
        // height: "auto",
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          video.pause();
          setPlay(false);
        },
      });
    }
  }, [isVisible]);

  // Handle progress bar updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!progressBarRef.current) return;
      const percentage = (video.currentTime / video.duration) * 100;
      progressBarRef.current.style.width = `${percentage}%`;
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      if (progressBarRef.current) progressBarRef.current.style.width = "0%";
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Seek functionality
  const handleSeek = (e) => {
    const bar = e.currentTarget;
    const video = videoRef.current;
    if (!video || !bar) return;
    const rect = bar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  const handleMouseDown = (e) => handleSeek(e);
  const handleMouseMove = (e) => e.buttons === 1 && handleSeek(e);

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    handleSeek(mouseEvent);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    handleSeek(mouseEvent);
  };

  // Toggle play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (play) video.play();
    else video.pause();
  }, [play]);

  // Toggle mute
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = muted;
  }, [muted]);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 z-10 size-full bg-black opacity-0"
      />

      {/* Video */}
      <video
        ref={videoRef}
        src="/new-main.mp4"
        muted
        playsInline
        preload="all"
        className="pointer-events-none absolute top-1/2 left-1/2 z-20 h-[60vh] w-[90vw] origin-center -translate-x-1/2 -translate-y-1/2 rounded-3xl object-fill transition-all duration-500 md:aspect-video md:h-auto md:w-[55vw] md:object-contain"

        // className="pointer-events-none absolute top-1/2 left-1/2 z-20 origin-center -translate-x-1/2 -translate-y-1/2 object-contain transition-all duration-500 sm:h-[60vh] sm:w-[90vw] md:aspect-video md:h-auto md:w-[55vw] md:rounded-3xl"
      />

      {/* Play button (initial) */}
      {!isVisible && (
        <div className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
          <button
            id="home-reel-video-watch-btn"
            aria-label="Watch reel button"
            onClick={() => setIsVisible(true)}
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
      )}

      {/* Controls + Progress Bar */}
      {isVisible && (
        <div className="absolute bottom-8 left-1/2 z-30 flex w-[90vw] -translate-x-1/2 items-center gap-4 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md md:w-[55vw]">
          <button onClick={() => setPlay((p) => !p)} className="text-white">
            {play ? "Pause" : "Play"}
          </button>

          <div
            className="relative h-[6px] flex-1 cursor-pointer rounded-full bg-gray-700"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div
              ref={progressBarRef}
              id="our-values-video-progress"
              className="absolute top-0 left-0 h-full rounded-full bg-white transition-all duration-100"
              style={{ width: "0%" }}
            ></div>
          </div>

          <button onClick={() => setMuted((m) => !m)} className="text-white">
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>
      )}

      {/* Close Button */}
      {isVisible && (
        <button
          id="home-reel-video-close"
          onClick={() => setIsVisible(false)}
          className="absolute top-6 right-8 z-40 text-4xl text-white transition-transform hover:scale-110"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default VideoExpandWidth;
