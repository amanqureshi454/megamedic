"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PlayIcon, PauseIcon, Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoGsap() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);

  const videoRef = useRef(null);
  const playButtonRef = useRef(null);
  const timelineRef = useRef(null);

  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playButtonHidden, setPlayButtonHidden] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Detect ANY user interaction on the page (including other videos)
  useEffect(() => {
    const detectInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener("click", detectInteraction);
      document.removeEventListener("touchstart", detectInteraction);
      document.removeEventListener("keydown", detectInteraction);
    };

    document.addEventListener("click", detectInteraction);
    document.addEventListener("touchstart", detectInteraction);
    document.addEventListener("keydown", detectInteraction);

    return () => {
      document.removeEventListener("click", detectInteraction);
      document.removeEventListener("touchstart", detectInteraction);
      document.removeEventListener("keydown", detectInteraction);
    };
  }, []);

  // Handle play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.play().catch((err) => console.log("Play failed:", err));
    } else {
      video.pause();
    }
  }, [playing]);

  // Handle mute
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  // ScrollTrigger
  useEffect(() => {
    if (!mounted) return;

    const container = containerRef.current;
    const videoWrapper = videoWrapperRef.current;
    const video = videoRef.current;
    const playButton = playButtonRef.current;
    const navbar = document.querySelector(".navbar");

    if (!container || !videoWrapper || !video || !playButton) return;

    const expandVideo = () => {
      gsap.to(videoWrapper, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px", // 🟣 remove border radius when expanded
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(videoRef, {
        borderRadius: "0px",
      });

      if (navbar) {
        gsap.to(navbar, {
          y: -100,
          opacity: 0,
          duration: 0.5,
        });
      }

      setShowControls(true);
      setPlaying(true);

      if (userInteracted) {
        setMuted(false);
      }
    };

    const resetVideo = () => {
      gsap.to(videoWrapper, {
        width: "45vw",
        height: "60vh",
        borderRadius: "24px",
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(videoRef, {
        borderRadius: "24px",
      });
      if (navbar) {
        gsap.to(navbar, {
          y: 0,
          opacity: 1,
          duration: 0.5,
        });
      }

      setShowControls(false);
      setPlaying(false);
      setPlayButtonHidden(false);
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
  }, [mounted]);

  // Progress tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration > 0) {
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent);
      }
    };

    const handleLoadedMetadata = () => {
      setProgress(0);
    };

    const handleEnded = () => {
      setProgress(100);
      video.currentTime = 0;
      if (playing) {
        video.play();
      }
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, [playing]);

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));

    video.currentTime = video.duration * percentage;
    setProgress(percentage * 100);
  };

  const handlePlayButtonClick = () => {
    setPlaying(true);
    setMuted(false);
    setPlayButtonHidden(true);
    setUserInteracted(true);
  };

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center md:-mt-24"
      suppressHydrationWarning
    >
      <div
        ref={videoWrapperRef}
        className="relative z-[60] h-[60vh] w-[45vw] overflow-hidden"
        style={{ transition: "all 0.8s ease-out" }}
        suppressHydrationWarning
      >
        <video
          ref={videoRef}
          playsInline
          muted={muted}
          preload="auto"
          loop
          className="round absolute inset-0 h-full w-full object-cover"
        >
          <source src="/new-main.mp4" type="video/mp4" />
        </video>

        {/* Play button overlay */}
        {!playing && (
          <div
            ref={playButtonRef}
            className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
          >
            <button
              onClick={handlePlayButtonClick}
              className="rounded-full bg-white/20 p-4 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30 active:scale-95"
              aria-label="Play video"
            >
              <PlayIcon className="h-8 w-8" />
            </button>
          </div>
        )}

        {/* Controls */}
        {showControls && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-lg bg-black/50 px-4 py-2 backdrop-blur-sm">
            <button
              onClick={() => {
                setPlaying(!playing);
                setUserInteracted(true);
              }}
              className="text-white transition-opacity hover:opacity-80"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6" />
              )}
            </button>

            <div
              onClick={handleSeek}
              className="relative h-2 w-64 cursor-pointer overflow-hidden rounded-full bg-white/30"
            >
              <span
                className="absolute top-0 left-0 block h-full bg-white transition-[width] duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              onClick={() => setMuted(!muted)}
              className="text-white transition-opacity hover:opacity-80"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
