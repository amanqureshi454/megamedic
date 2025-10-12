"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useDeviceType } from "../_lib/useDeviceType";

gsap.registerPlugin(ScrollTrigger);

const calculateTopGap = (elm) => {
  return (window.innerHeight - elm.clientHeight) / 2;
};

const VideoExpanded = () => {
  const videoSectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const videoContainerRef = useRef(null);
  const introVideoRef = useRef(null);
  const videoRef = useRef(null);
  const masterTLRef = useRef(null);
  const videoTLRef = useRef(null);
  const overlayVideoRef = useRef(null);
  const { isMobile, isDesktop } = useDeviceType();

  const [muted, setMuted] = useState(!true);
  const [play, setPlay] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [duration, setDuration] = useState(0);
  const buttonRef = useRef();
  const progressBarRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const handleSeek = (e) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;
    if (!video || !progressBar || !duration) return;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;
    video.currentTime = newTime;
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleSeek(e);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1) {
      handleSeek(e);
    }
  };

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

  const handleForceStart = () => {
    if (masterTLRef.current) {
      console.log("clicked");
      // Scroll the page to the trigger’s start position
      const startY = masterTLRef.current.start;
      window.scrollTo({ top: startY, behavior: "smooth" });

      if (videoTLRef.current) {
        videoTLRef.current.pause();
        videoTLRef.current.progress(2);
      }

      // Ensure the video is visible, playing, and unmuted
      setIsVisible(!isVisible);
      setPlay(!play);
      setMuted(!muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      if (duration && !isNaN(duration) && duration > 0) {
        const percentage = (currentTime / duration) * 100;
        const progressBar = document.querySelector(
          "#our-values-video-progress",
        );
        if (progressBar) {
          progressBar.style.width = `${percentage}%`;
        }

        if (percentage >= 99.9 && masterTLRef.current) {
          const scrollTrigger = masterTLRef.current;
          const endPosition = scrollTrigger.end;

          window.scrollTo({
            top: endPosition,
            behavior: "smooth",
          });
        }
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      const progressBar = document.querySelector("#our-values-video-progress");
      if (progressBar) {
        progressBar.style.width = "0%";
      }
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("durationchange", handleDurationChange);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("durationchange", handleDurationChange);
    };
  }, []);

  useEffect(() => {
    const videoWrapper = document.querySelector("#our-values-video-video");
    const video = introVideoRef.current;

    if (!videoWrapper || !video) return;

    if (isVisible) {
      videoWrapper.classList.add("active");
      setPlay(true);

      if ("fastSeek" in video) video.fastSeek(0);
      else video.currentTime = 0;

      video.play().catch((error) => {
        console.warn("Video play failed:", error);
      });
    } else {
      videoWrapper.classList.remove("active");
      setPlay(false);
      video.pause();
    }
  }, [isVisible]);

  // control muting video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  // control playback video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (play) {
      if ("fastSeek" in video) video.fastSeek(0);
      else video.currentTime = 0;

      video.play().catch((error) => {
        console.warn("Video play failed:", error);
      });
    } else {
      video.pause();
    }
  }, [play]);

  // The main scrolling effect here
  useEffect(() => {
    if (!introVideoRef.current) return;

    const headingTitle = document.getElementById("our-value-heading-title");
    const videoWrapper = document.getElementById("videoWrapper");
    const rect = videoContainerRef.current?.getBoundingClientRect();
    const init = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
    const coverScale = (85 * window.innerWidth) / init.width / 100;

    if (window.innerWidth >= 768) {
      masterTLRef.current = ScrollTrigger.create({
        trigger: videoWrapper,
        start: `top-=${calculateTopGap(videoWrapper)}px top`,
        end: `bottom+=700% bottom`,
        pin: true,
        scrub: 1,
        markers: false,
        invalidateOnRefresh: true,
        animation: videoTLRef.current,
        onEnter: () => {
          setIsVisible(true);
          setPlay(true);
          setMuted(false);
        },
        onEnterBack: () => {
          setIsVisible(true);
          setPlay(true);
          setMuted(false);
        },
        onLeave: () => {
          setIsVisible(false);
          setPlay(true);
          setMuted(true);
        },
        onLeaveBack: () => {
          setIsVisible(false);
          setPlay(true);
          setMuted(true);
        },
      });

      videoTLRef.current = gsap.timeline({
        defaults: {
          ease: "none",
        },
        paused: true,
      });

      videoTLRef.current
        .to(overlayVideoRef.current, {
          opacity: 1,
        })
        .to(
          videoContainerRef.current,
          {
            x: 0,
            duration: 2,
          },
          0,
        )
        .to(
          videoRef.current,
          {
            scale: coverScale,
            borderRadius: 0,
            duration: 2,
          },
          0,
        )
        .to({}, { duration: 5 }, 1)
        .to(
          videoRef.current,
          {
            scale: 1,
            borderRadius: "24px",
            duration: 2,
          },
          7,
        );
    }

    const onResize = () => {
      if (window.innerWidth >= 768) {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", onResize);
    return () => {
      if (window.innerWidth >= 768) {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        videoTLRef.current.kill();
      }
    };
  }, []);

  return (
    <div ref={videoSectionRef} className="relative w-full">
      <div
        ref={wrapperRef}
        id="videoWrapper"
        className="relative flex h-auto w-full"
      >
        <div
          ref={videoContainerRef}
          className="relative mx-auto aspect-video w-[85%] md:w-[55vw]"
        >
          <video
            ref={introVideoRef}
            src="/intro.mp4"
            muted
            autoPlay={isMobile}
            playsInline
            className="pointer-events-none relative z-10 size-full rounded-3xl object-cover"
          />

          <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <button
              id="home-reel-video-watch-btn"
              aria-label="Watch reel button"
              onClick={
                isMobile ? () => setIsVisible(!isVisible) : handleForceStart
              }
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
      </div>

      <div id="our-values-video-video">
        <div
          ref={overlayVideoRef}
          className="overlay-video pointer-events-none absolute top-0 left-0 hidden size-full bg-black opacity-0 md:block"
        ></div>

        <button
          id="home-reel-video-close"
          className="!pointer-events-auto !opacity-100"
          onClick={() => {
            setIsVisible(false);

            if (masterTLRef.current) {
              const scrollTrigger = masterTLRef.current;
              const endPosition = scrollTrigger.end;

              window.scrollTo({
                top: endPosition,
                behavior: "smooth",
              });
            }
          }}
        >
          <span>×</span>
        </button>

        <video
          ref={videoRef}
          src="/new-main.mp4"
          muted={muted}
          playsInline
          preload="all"
          className="pointer-events-none absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 object-contain md:aspect-video md:!h-auto md:!w-[55vw] md:rounded-3xl"
          onLoadStart={() => {
            const progressBar = document.querySelector(
              "#our-values-video-progress",
            );
            if (progressBar) {
              progressBar.style.width = "0%";
            }
          }}
        />

        <div
          className="bar"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={() => setPlay((prev) => !prev)}
            className="btn"
            disabled={!isVisible}
          >
            {play ? "pause" : "play"}
          </button>
          <span
            className="bar-inner"
            ref={progressBarRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <span id="our-values-video-progress" className="progress"></span>
          </span>
          <button onClick={() => setMuted((prev) => !prev)} className="btn">
            {muted ? "unmute" : "mute"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoExpanded;
