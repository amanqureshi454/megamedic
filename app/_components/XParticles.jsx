"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "../_utils/cn";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const XParticles = ({ svgFill = "#C5D3BA", className, type = "one" }) => {
  const xParticlesRef = useRef(null);

  useGSAP(
    () => {
      if (!xParticlesRef.current || !xParticlesRef.current.children.length)
        return;
      const xParticles = xParticlesRef.current.children;

      gsap.to(xParticles, {
        xPercent: 100,
        ease: "none",
        scrollTrigger: {
          trigger: xParticlesRef.current,
          start: "top 60%",
          scrub: 2,
        },
      });
    },
    { scope: xParticlesRef },
  );

  const particlesStyles = {
    one: {
      first: "-left-[2%] size-60",
      second: "left-6/12 size-20",
      third: "left-9/12 size-40",
      fourth: "top-2/12 left-5/12 size-40",
    },
    two: {
      first: "left-4/12 size-20",
      second: "left-7/12 top-5 size-60",
      third: "left-10/12 top-2/12 size-40",
      fourth: "top-2/12 left-5/12 size-40",
    },
  };
  return (
    <div ref={xParticlesRef} className="-z-10">
      {[...Array(4)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 272 308"
          className={cn(
            "absolute",
            i === 0 && particlesStyles[type].first,
            i === 1 && particlesStyles[type].second,
            i === 2 && particlesStyles[type].third,
            i === 3 && particlesStyles[type].fourth,

            className,
          )}
        >
          <path
            fill={svgFill}
            d="m0 69.3834 25.9166-31.9519L271.556 236.673l-25.916 31.952L0 69.3834Z"
          />
          <path
            fill={svgFill}
            d="m173.153 0 37.929 15.9377L88.556 307.525l-37.9287-15.937L173.153 0Z"
          />
        </svg>
      ))}
    </div>
  );
};

export default XParticles;
