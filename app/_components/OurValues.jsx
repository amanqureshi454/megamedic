"use client";

import { useSplitTitleAnimation } from "../_gsap/useSplitTitleAnimation";
// import VideoScrub from "./VideoScrub";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoExpanded from "./VideoExpanded";
import MobileVideoExpand from "./MobileVideoExpand";
import ClientOnly from "../_lib/orientation";
import { useOrientation } from "../_lib/ClientOnly";
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function OurValues({ data }) {
  const ourValuesRef = useRef(null);
  const orientation = useOrientation();

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
      </div>

      {orientation === "portrait" ? <MobileVideoExpand /> :<ClientOnly>
  <VideoExpanded />
</ClientOnly>}
    </section>
  );
}
