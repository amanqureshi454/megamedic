"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoGsap() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const playButtonRef = useRef(null);
  const timelineRef = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [play, setPlay] = useState(false);
  const [muted, setMuted] = useState(true); // Start muted for autoplay compliance
  const [userInteracted, setUserInteracted] = useState(false); // Track first interaction
  const [showControls, setShowControls] = useState(true); // Control visibility

  /* ---------------------------------------------------------- */
  /* 1. Mount flag */
  useEffect(() => setMounted(true), []);

  /* ---------------------------------------------------------- */
  /* 2. Play / Pause handling – enable autoplay after interaction */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (play && (userInteracted || !video.paused)) {
      video.play().catch((err) => console.log("Autoplay blocked:", err));
    } else {
      video.pause();
    }
  }, [play, userInteracted]);

  /* ---------------------------------------------------------- */
  /* 3. Mute handling */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  /* ---------------------------------------------------------- */
  /* 4. ScrollTrigger – expand / collapse + control visibility + autoplay */
  useEffect(() => {
    if (!mounted) return;

    const container = containerRef.current;
    const videoWrapper = videoWrapperRef.current;
    const video = videoRef.current;
    const playButton = playButtonRef.current;
    const navbar = document.querySelector(".navbar");

    if (!container || !videoWrapper || !video || !playButton || !navbar) return;

    const expandVideo = () => {
      videoWrapper.style.width = "95vw";
      videoWrapper.style.height = "95vh";
      navbar.style.transform = "translateY(-100px)";
      navbar.style.opacity = "0";
      playButton.style.opacity = "0";
      playButton.style.pointerEvents = "none";
      video.autoplay = true;
      setShowControls(true); // Hide controls on expand
      // Autoplay when entering, if user has interacted
      if (userInteracted) {
        video.muted = muted;
        video.play().catch((err) => console.log("Autoplay failed:", err)); // Direct play call
        setPlay(true); // Sync state
      }
    };

    const resetVideo = () => {
      videoWrapper.style.width = "40vw";
      videoWrapper.style.height = "50vh";
      navbar.style.transform = "translateY(0)";
      navbar.style.opacity = "1";
      playButton.style.opacity = "1";
      playButton.style.pointerEvents = "auto";
      setShowControls(false); // Show controls on collapse
      video.pause();
      setPlay(false);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom+=100% bottom",
        pin: true,
        scrub: false,
        markers: false,
        onEnter: expandVideo,
        onEnterBack: expandVideo,
        onLeave: resetVideo,
        onLeaveBack: resetVideo,
      },
    });

    timelineRef.current = tl;

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [mounted, muted, userInteracted]);

  /* ---------------------------------------------------------- */
  /* 5. Progress bar – ensure reliable updates */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const progressBar = document.getElementById("our-values-video-progress");
    if (!progressBar) return;

    const updateProgress = () => {
      if (!isNaN(video.duration) && video.duration > 0) {
        const percentage = Math.min(
          100,
          (video.currentTime / video.duration) * 100,
        );
        progressBar.style.width = `${percentage}%`;
      }
    };

    const handleTimeUpdate = () => {
      updateProgress();
    };

    // Initialize progress bar to 0% when video loads
    const handleLoadedMetadata = () => {
      progressBar.style.width = "0%";
    };

    // Ensure progress bar reaches 100% on end
    const handleEnded = () => {
      progressBar.style.width = "100%";
    };

    // Attach event listeners
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    // Cleanup event listeners
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  /* ---------------------------------------------------------- */
  /* 6. Close button – unchanged */
  const handleClose = () => {
    if (timelineRef.current && timelineRef.current.scrollTrigger) {
      timelineRef.current.scrollTrigger.disable();
      timelineRef.current.scrollTrigger.kill();
      timelineRef.current.kill();
    }
    const videoWrapper = videoWrapperRef.current;
    const video = videoRef.current;
    const navbar = document.querySelector(".navbar");

    if (videoWrapper && video && navbar) {
      videoWrapper.style.width = "40vw";
      videoWrapper.style.height = "50vh";
      video.pause();
      navbar.style.transform = "translateY(0)";
      navbar.style.opacity = "1";
      setPlay(false);
      setShowControls(true);
    }
  };

  /* ---------------------------------------------------------- */
  /* Render */
  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center"
    >
      <div
        ref={videoWrapperRef}
        className="relative z-[60] h-[50vh] w-[40vw] overflow-hidden rounded-3xl"
      >
        <video
          ref={videoRef}
          src="/new-main.mp4"
          playsInline
          muted={muted}
          preload="auto"
          loop
          autoPlay
          className="absolute inset-0 h-full w-full rounded-3xl object-cover"
        />

        {/* Play overlay button – records initial user gesture */}
        <div
          ref={playButtonRef}
          className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        >
          <button
            id="home-reel-video-watch-btn"
            aria-label="Watch reel button"
            onClick={() => {
              setPlay((p) => !p);
              setUserInteracted(true); // Mark interaction
              setMuted(false); // Unmute on first tap
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="none"
              viewBox="0 0 36 36"
            >
              <path
                fill="currentColor"
                d="M7 7.29c0-1.5 1.59-2.466 2.92-1.776l20.656 10.71c1.439.747 1.439 2.805 0 3.552L9.92 30.486C8.589 31.176 7 30.21 7 28.71V7.29Z"
              />
            </svg>
          </button>
        </div>

        {/* Controls (progress bar) – conditional */}
        {showControls && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-md bg-white/20 p-2">
            <button
              onClick={() => {
                setPlay((p) => !p);
                setUserInteracted(true);
              }}
              className="text-white"
            >
              {play ? "Pause" : "Play"}
            </button>

            <div
              onClick={(e) => {
                const video = videoRef.current;
                if (!video || !video.duration) return;

                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = Math.max(
                  0,
                  Math.min(1, clickX / rect.width),
                );

                video.currentTime = video.duration * percentage;
                const progressBar = document.getElementById(
                  "our-values-video-progress",
                );
                if (progressBar)
                  progressBar.style.width = `${percentage * 100}%`;
              }}
              className="relative h-2 w-64 cursor-pointer overflow-hidden rounded bg-white/80"
            >
              <span
                id="our-values-video-progress"
                className="absolute top-0 left-0 block h-full w-0 bg-black transition-[width] duration-100"
              ></span>
            </div>

            <button onClick={() => setMuted((m) => !m)} className="text-white">
              {muted ? "Unmute" : "Mute"}
            </button>
          </div>
        )}

        {/* Close button – uncomment if needed */}
        {/* <button
          onClick={handleClose}
          className="absolute top-2 right-2 h-10 w-10 rounded-full bg-[#34855b] text-2xl font-bold text-white"
        >
          ×
        </button> */}
      </div>
    </div>
  );
}
