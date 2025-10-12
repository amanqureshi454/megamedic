"use client";
import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import dynamic from "next/dynamic";

const loadGSAP = async () => {
  try {
    const [gsapModule, scrollTriggerModule] = await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]);
    const gsap = gsapModule.default;
    const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    return { gsap, ScrollTrigger };
  } catch (error) {
    console.error("Failed to load GSAP:", error);
    return null;
  }
};

const ThreeScene = dynamic(() => Promise.resolve(ThreeSceneComponent), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "100vh", background: "#f0f0f0" }}>
      Loading 3D Scene...
    </div>
  ),
});

function VideoModel2({ src }) {
  const gltf = useLoader(GLTFLoader, "/models/video9.glb");
  const mixerRef = useRef(null);
  const actionRef = useRef(null);
  const sceneRef = useRef(null);
  const { viewport } = useThree();
  const [gsapReady, setGsapReady] = useState(false);
  const texture = useLoader(THREE.TextureLoader, "/clip.png");
  const materialRef = useRef(null);
  const scrollProgress = useRef(0);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false;
  texture.needsUpdate = true;

  useEffect(() => {
    const initGsap = async () => {
      if (typeof window === "undefined") return;

      try {
        const result = await loadGSAP();
        if (result) {
          setGsapReady(true);
        }
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };

    const timer = setTimeout(initGsap, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !gltf) return;
    try {
      const video = document.createElement("video");
      video.src = src;
      video.crossOrigin = "anonymous";
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";

      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d");

      const composedTexture = new THREE.CanvasTexture(canvas);
      composedTexture.colorSpace = THREE.SRGBColorSpace;

      const overlayImg = new Image();
      overlayImg.src = "/img.png";
      overlayImg.crossOrigin = "anonymous";
      let overlayOpacity = 1;

      overlayImg.onload = () => {
        function drawFrame() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.scale(1, -1);
          ctx.drawImage(video, 0, -1024, canvas.width, canvas.height);
          ctx.restore();
          ctx.globalAlpha = overlayOpacity;
          ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1;
          composedTexture.needsUpdate = true;
          requestAnimationFrame(drawFrame);
        }

        drawFrame();
      };

      gltf.scene.traverse((child) => {
        if (child.isMesh && child.name === "Plane_4") {
          const mat = new THREE.MeshBasicMaterial({
            map: composedTexture,
            transparent: true,
            side: THREE.DoubleSide,
          });
          child.material = mat;
          child.material.needsUpdate = true;
          materialRef.current = {
            mesh: child,
            setOpacity: (val) => {
              overlayOpacity = val;
            },
          };
        }
      });
      video.play();
    } catch (error) {}
  }, [gltf, src]);

  useEffect(() => {
    if (!gsapReady || !gltf || typeof window === "undefined") return;

    const setupAnimation = async () => {
      try {
        const gsapData = await loadGSAP();
        if (!gsapData) return;

        const { gsap } = gsapData;
        const scaleFactor = viewport.width / 18;

        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(gltf.scene);
          const clip = gltf.animations[0];
          const action = mixer.clipAction(clip);
          action.loop = THREE.LoopOnce;
          action.clampWhenFinished = true;
          action.play();
          action.paused = true;
          mixerRef.current = mixer;
          actionRef.current = action;
          document.querySelector("#company-intro-scene")?.classList.add("init");
          const isPhone = window.matchMedia(
            "only screen and (max-width: 767px)",
          ).matches;

          if (isPhone) {
            if (actionRef.current && clip.duration > 0) {
              actionRef.current.time = clip.duration;
              actionRef.current.paused = true;
              mixerRef.current.update(0);
            }

            if (materialRef.current) {
              materialRef.current.setOpacity(0);
            }

            gsap.set("#company-intro-scene", {
              top:
                document.querySelector("#company-intro").offsetHeight -
                document.querySelector("#company-intro-scene").offsetHeight,
              x: "0%",
            });

            gsap.set("#home-reel-video-watch-btn", {
              opacity: 1,
              scale: 1,
            });

            gsap.set("#home-reel-video-title i", {
              yPercent: 0,
              opacity: 1,
            });

            scrollProgress.current = 1;
          } else {
            const tl = gsap.timeline({
              defaults: { duration: 1, ease: "power2.out" },
              scrollTrigger: {
                trigger: "#company-intro",
                start: "top center",
                end: "bottom-=300 center-=25%",
                scrub: 1,
              },
            });

            const opacity = {
              value: 0.75,
            };

            tl.to(
              opacity,
              {
                value: 0,
                duration: 1,
                ease: "none",
                onUpdate: () => {
                  if (materialRef.current) {
                    materialRef.current.setOpacity(opacity.value);
                  }
                },
              },
              1,
            );

            tl.to(
              { progress: 0 },
              {
                progress: 1,
                duration: 2,
                onUpdate: function () {
                  scrollProgress.current = this.targets()[0].progress;
                  if (actionRef.current && clip.duration > 0) {
                    const targetTime =
                      this.targets()[0].progress * clip.duration;
                    actionRef.current.time = targetTime;
                    actionRef.current.paused = true;
                    mixerRef.current.update(0);
                  }
                },
              },
              0.75,
            );

            const top =
              document.querySelector("#gsap-description").offsetTop -
              ((document.querySelector("#company-intro-scene").offsetHeight /
                100) *
                18) /
                scaleFactor;

            tl.fromTo(
              "#company-intro-scene",
              {
                top: top,
                duration: 2,
                scale: 1,
              },
              {
                top:
                  document.querySelector("#company-intro").offsetHeight -
                  document.querySelector("#company-intro-scene").offsetHeight,
                duration: 2,
                x: "0%",
                scale: 0.8,
              },
              1,
            );

            tl.fromTo(
              "#gsap-description",
              {
                y: 0,
                duration: 2,
              },
              {
                y: -500,
                duration: 2,
              },
              0.8,
            );

            tl.fromTo(
              "#company-intro > h2",
              {
                y: 0,
                duration: 2,
              },
              {
                y: -500,
                duration: 2,
              },
              0.8,
            );

            tl.fromTo(
              sceneRef.current.position,
              {
                duration: 2,
                x: 0,
                y: -1,
                z: 1,
              },
              {
                duration: 2,
                x: 0,
                y: -1,
                z: 3,
              },
              1,
            );

            tl.fromTo(
              "#home-reel-video-watch-btn",
              {
                opacity: 0,
                scale: 0,
                duration: 1,
              },
              {
                opacity: 1,
                scale: 1,
                duration: 1,
              },
              1,
            );

            tl.fromTo(
              "#home-reel-video-title i",
              {
                yPercent: 100,
                opacity: 0,
                duration: 0.25,
                stagger: {
                  from: "random",
                  amount: 0.25,
                },
              },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.25,
                stagger: {
                  from: "random",
                  amount: 0.25,
                },
              },
              1.5,
            );
          }
        }

        if (sceneRef.current && viewport.width > 0) {
          sceneRef.current.scale.setScalar(scaleFactor);
        }
      } catch (error) {
        console.error("Animation setup error:", error);
      }
    };

    const timer = setTimeout(() => {
      setupAnimation();
    }, 1000);

    return () => clearTimeout(timer);
  }, [gltf, gsapReady, viewport.width]);

  if (!gltf || !gltf.scene) return null;

  return <primitive ref={sceneRef} object={gltf.scene} position={[0, -1, 1]} />;
}

function ThreeSceneComponent({ play, iconUrl, data, number, src }) {
  return (
    <Canvas
      className={`canvas-canvas-${number}`}
      camera={{ position: [0, 0, -6], fov: 70 }}
      onCreated={(state) => {
        state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        state.gl.setSize(window.innerWidth, window.innerHeight);
      }}
    >
      <ambientLight intensity={10} />
      <Suspense fallback={null}>
        {number === 2 && (
          <VideoModel2 src={src} play={play} iconUrl={iconUrl} data={data} />
        )}
      </Suspense>
    </Canvas>
  );
}

export const useMouseFollow = (size = 50) => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const el = ref.current;
    if (!el) return;

    const onMove = async (e) => {
      try {
        const gsapData = await loadGSAP();
        if (!gsapData) return;

        const { gsap } = gsapData;

        let x = e.clientX;
        let y = e.clientY;
        if (e.touches) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        }

        gsap.to(el, {
          x: x - size * 1.5,
          y: y - size * 1.5,
          duration: 0.2,
          ease: "power2.out",
        });
      } catch (error) {
        console.error("Mouse follow error:", error);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, [size]);

  return ref;
};

export function VideoSuper({
  iconUrl,
  data,
  src = "https://cdn.pixabay.com/video/2023/03/08/153821-806526710_large.mp4",
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [muted, setMuted] = useState(!true);
  const [play, setPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [duration, setDuration] = useState(0);
  const buttonRef = useRef();
  const videoRef = useRef();
  const progressBarRef = useRef();

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      if (duration && !isNaN(duration) && duration > 0) {
        const percentage = (currentTime / duration) * 100;
        const progressBar = document.querySelector("#home-reel-video-progress");
        if (progressBar) {
          progressBar.style.width = `${percentage}%`;
        }
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      const progressBar = document.querySelector("#home-reel-video-progress");
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
  }, [isClient]);

  useEffect(() => {
    const videoWrapper = document.querySelector("#home-reel-video-video");
    const video = videoRef.current;

    if (!videoWrapper || !video) return;

    if (isVisible) {
      videoWrapper.classList.add("active");
      setPlay(true);
      video.play().catch((error) => {
        console.warn("Video play failed:", error);
      });
    } else {
      videoWrapper.classList.remove("active");
      setPlay(false);
      video.pause();
    }
  }, [isVisible]);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (play && isVisible) {
      video.play().catch((error) => {
        console.warn("Video play failed:", error);
      });
    } else {
      video.pause();
    }
  }, [play, isVisible]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    button.style.opacity = isHovered ? "0" : "1";
  }, [isHovered]);

  if (!isClient) return null;

  return (
    <>
      <div id="company-intro-scene" className="home-reel-video">
        <button
          onClick={() => setIsVisible(!isVisible)}
          id="home-reel-video-watch-btn"
          aria-label="Watch reel button"
        >
          <h2 id="home-reel-video-title">
            <span>
              <i>P</i>
              <i>L</i>
              <i>A</i>
              <i>Y</i>
            </span>
            <span>
              <i>R</i>
              <i>E</i>
              <i>E</i>
              <i>L</i>
            </span>
          </h2>
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
        {isMounted && (
          <ThreeScene src={src} number={2} data={data} iconUrl={iconUrl} />
        )}
      </div>
      <div
        id="home-reel-video-video"
        onMouseMove={async (e) => {
          if (!buttonRef.current) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX;
          const y = e.clientY;
          const relativeX = (e.clientX - rect.left) / rect.width;
          const relativeY = (e.clientY - rect.top) / rect.height;
          const distanceFromCenter =
            Math.sqrt(
              Math.pow(relativeX - 0.5, 2) + Math.pow(relativeY - 0.5, 2),
            ) * Math.sqrt(2);

          try {
            const gsapData = await loadGSAP();
            if (!gsapData) return;
            const { gsap } = gsapData;
            gsap.to(buttonRef.current, {
              top: y,
              left: x,
              duration: 0.4,
              ease: "power1.out",
            });
            const scale = 0.8 + distanceFromCenter * 0.8;
            gsap.to(buttonRef.current, {
              scale: scale,
              duration: 0.3,
              ease: "power1.out",
            });
            const rotation = (relativeX - 0.5) * 30 + (relativeY - 0.7) * 150;
            gsap.to("#video-overlay-cursor-svg", {
              rotation: rotation,
              duration: 0.5,
              ease: "power1.out",
            });
          } catch (error) {}
        }}
      >
        <button id="home-reel-video-close" onClick={() => setIsVisible(false)}>
          <span>×</span>
        </button>
        <video
          src={src}
          muted={muted}
          playsInline
          ref={videoRef}
          onClick={() => setIsVisible(false)}
          preload="all"
          onLoadStart={() => {
            const progressBar = document.querySelector(
              "#home-reel-video-progress",
            );
            if (progressBar) {
              progressBar.style.width = "0%";
            }
          }}
        />
        <div id="video-overlay-cursor" ref={buttonRef}>
          <svg
            id="video-overlay-cursor-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
            viewBox="0 0 36 36"
          >
            <path
              stroke="#020022"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M31 31 17.928 18 31 5M5 5l13.072 13L5 31"
            ></path>
          </svg>
        </div>
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
            <span id="home-reel-video-progress" className="progress"></span>
          </span>
          <button onClick={() => setMuted((prev) => !prev)} className="btn">
            {muted ? "unmute" : "mute"}
          </button>
        </div>
      </div>
    </>
  );
}
