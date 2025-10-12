"use client";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { inter } from "../_lib/font";
import { useRevealOnScroll } from "../_gsap/useRevealOnScroll";
import { useSplitLinesAnimation } from "../_gsap/useSplitLineAnimation";
import { useSplitTitleAnimation } from "../_gsap/useSplitTitleAnimation";
import XParticles from "./XParticles";
import { VideoSuper } from "./VideoSuper";

export default function CompanyIntro({ data }) {
  const companyIntroRef = useRef(null);
  useSplitTitleAnimation({
    trigger: "#gsap-title",
    titleSelector: "#gsap-title",
    start: "top 80%",
    end: "bottom 20%",
    direction: "left",
    duration: 1.8,
    stagger: 0.05,
  });
  useSplitLinesAnimation({
    trigger: ".company-intro",
    descriptionSelector: "#gsap-description p",
    start: "top 40%",
    duration: 1.8,
    delay: 0.5,
    stagger: 0.05,
  });
  useRevealOnScroll({
    selector: ".video-cta",
    delay: 0.5,
  });
  return (
    <section ref={companyIntroRef} className="company-intro relative">
      <XParticles />
      <div
        id="company-intro"
        className="xs:space-y-12 mx-auto mt-10 w-[85%] space-y-6 py-20"
      >
        <h2
          className={`${inter.className} xs:text-3xl xs:tracking-tighter text-xl leading-[1.2] font-normal md:text-4xl lg:text-6xl xl:w-[85%]`}
          id="gsap-title"
        >
          {data?.title}
        </h2>
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1.5fr_1.3fr]">
          <div
            className="xs:text-lg prose w-full max-w-none space-y-4 text-sm leading-[1.5]"
            id="gsap-description"
          >
            <ReactMarkdown>{data?.description}</ReactMarkdown>
          </div>
          <VideoSuper src="/Nexamedic.webm" />
        </div>
        <div className="box"></div>
        {/* <LinkButton className={"flex items-center gap-4 xl:hidden"}>
          <span className="relative z-20">{data?.cta?.text}</span>
          <Image
            width={200}
            height={200}
            alt={data?.cta?.text}
            className="size-4 -rotate-45 transition-all duration-300 group-hover:rotate-0"
            src={iconUrl}
          />
        </LinkButton> */}
      </div>
    </section>
  );
}
