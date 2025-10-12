"use client";
import React, { useEffect, useRef } from "react";

export default function AboutHero({ data }) {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 👇 when 50% visible — play
          if (entry.isIntersecting) {
            video.play();
          } else {
            // 👇 when less than 50% visible — pause
            video.pause();
          }
        });
      },
      { threshold: 0.5 }, // 50% visible
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-secondary relative flex aspect-video w-full items-center justify-center overflow-hidden text-white">
      {/* Background Video */}
      <video
        ref={videoRef}
        controls={true}
        poster="/about-video-poster.png"
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={data?.video?.url} type="video/mp4" />
      </video>
    </div>
  );
}
