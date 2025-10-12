"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { useVideoTexture, useAspect } from "@react-three/drei";
import { useFrame, Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Video = ({ container }) => {
  const size = useAspect(1920, 1080);
  const videoRef = useRef(null);
  const videoDuration = useRef(0);
  const intentObserver = useRef(null);
  const [playAnimation, setPlayAnimation] = useState(false);
  const mockupRef = useRef(null);
  const groupRef = useRef(null);
  const { contextSafe } = useGSAP();
  const timeRef = useRef(0);
  const [isPinned, setIsPinned] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [playDirection, setPlayDirection] = useState(1);

  const introTexture = useVideoTexture("/intro.mp4", {
    start: true,
    loop: true,
    muted: true,
    playsInline: true,
  });
  const texture = useVideoTexture("/main.mp4", {
    start: false,
    loop: false,
    muted: true,
    playsInline: true,
  });

  useGSAP(
    () => {
      gsap.to(groupRef.current.scale, {
        x: playAnimation ? 1 : 0.5,
        y: playAnimation ? 1 : 0.5,
        duration: 1,
        ease: "power2.inOut",
      });
      gsap.to(mockupRef.current.material, {
        opacity: playAnimation ? 0 : 1,
        duration: 1,
        ease: "power2.inOut",
      });
    },
    { scope: groupRef, dependencies: [playAnimation] },
  );

  useFrame((_, delta) => {
    if (texture?.source?.data && isPinned) {
      videoRef.current = texture.source.data;
      videoDuration.current = texture.source.data.duration || 0;

      // Calculate new time
      const newTime = timeRef.current + delta * playDirection;

      // Clamp between 0 and duration (no looping)
      timeRef.current = Math.max(0, Math.min(newTime, videoDuration.current));

      const timeDiff = Math.abs(timeRef.current - videoRef.current.currentTime);
      if (timeDiff > 0.06) {
        videoRef.current.currentTime = timeRef.current;
      }
      texture.needsUpdate = true;

      //   Check if video reached the end or start
      if (
        playDirection === -1 &&
        timeRef.current < 0.1 &&
        timeRef.current !== 0 &&
        !hasFinished
      ) {
        setPlayAnimation(false);
      }
    }
  });

  useGSAP(() => {
    let scrollTimeout = gsap
      .delayedCall(1, () => setHasFinished(false))
      .pause();
    let direction = 1;
    intentObserver.current = ScrollTrigger.observe({
      type: "wheel,touch",
      onUp: () => {
        direction = -1;
        setPlayDirection(-1);
        if (direction === -1 && timeRef.current === 0) {
          intentObserver.current.disable();
          setPlayAnimation(false);
        }
      },
      onDown: () => {
        setPlayDirection(1);
        direction = 1;
        if (direction === 1 && timeRef.current === videoDuration.current) {
          intentObserver.current.disable();
        }
        if (direction === 1 && timeRef.current === 0) {
          setPlayAnimation(true);
        }
      },
      tolerance: 10,
      scrollSpeed: playDirection === 1 ? 1 : -1,
      preventDefault: true,
      onEnable(self) {
        // scrollTimeout.restart(true);
        setHasFinished(false);

        let savedScroll = self.scrollY();
        self._restoreScroll = () => self.scrollY(savedScroll);
        window.addEventListener("scroll", self._restoreScroll, {
          passive: false,
        });
      },
      onDisable: (self) => {
        window.removeEventListener("scroll", self._restoreScroll);
        setHasFinished(false);
      },
    });

    intentObserver.current.disable();
  });

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: container.current,
      pin: true,
      start: "top top",
      end: "+=200",
      onEnter: (self) => {
        if (intentObserver.current.isEnabled) return;
        setIsPinned(true);
        setPlayAnimation(true);
        self.scroll(self.start + 1);
        intentObserver.current.enable();
      },
      onEnterBack: (self) => {
        if (intentObserver.current.isEnabled) return;

        self.scroll(self.end - 1);
        intentObserver.current.enable();
      },

      onLeaveBack: () => {
        setHasFinished(false);
        setPlayAnimation(false);
      },
    });
  }, {});

  return (
    <>
      <group ref={groupRef} scale={[0.5, 0.5, 1]}>
        <mesh ref={mockupRef} scale={size}>
          <planeGeometry />
          <meshBasicMaterial
            map={introTexture}
            toneMapped={false}
            transparent={true}
          />
        </mesh>

        <mesh scale={size}>
          <planeGeometry />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </>
  );
};

const VideoTextureCanvas = () => {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="relative min-h-screen" />;

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <div id="scene-3d" className="h-screen w-full">
        <Canvas
          camera={{ position: [0, 0, 4], fov: 75 }}
          className="h-screen w-full"
        >
          <Suspense fallback={null}>
            <Video container={containerRef} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default VideoTextureCanvas;
