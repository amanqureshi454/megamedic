"use client";

import { useSplitTitleAnimation } from "../_gsap/useSplitTitleAnimation";
// import VideoScrub from "./VideoScrub";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoExpanded from "./VideoExpanded";
import VideoExpandWidth from "./VideoExpandWidth";
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function OurValues({ data }) {
  const ourValuesRef = useRef(null);

  useSplitTitleAnimation({
    trigger: "#our-value-gsap-title",
    titleSelector: "#our-value-gsap-title",
    start: "top 80%",
    end: "bottom center",
    direction: "left",
    duration: 1.8,
    stagger: 0.05,
  });

  return (
    <section
      ref={ourValuesRef}
      className="relative space-y-8 py-20"
      id="our-value"
    >
      <div id="our-values-heading-title" className="mx-auto w-[85%] space-y-20">
        <h2
          className="our-value-heading-text xs:text-6xl !inline-block !overflow-visible text-3xl"
          id="our-value-gsap-title"
          style={{ overflow: "visible", display: "inline-block" }}
        >
          {data?.title}
        </h2>
        {/* <div className="relative aspect-video w-full overflow-hidden">
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/1125900592?h=695142dc53"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            allowfullscreen
            className="absolute top-0 left-0 h-full w-full"
          ></iframe>
        </div> */}
      </div>

      {/* <VideoScrub /> */}
      <VideoExpandWidth />
      {/* <VideoExpanded /> */}
    </section>
  );
}
