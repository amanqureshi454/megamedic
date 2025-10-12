"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { inter } from "../_lib/font";
import { useSplitTitleAnimation } from "../_gsap/useSplitTitleAnimation";

export default function HeroContent({ title, subTitle }) {
  const [first, second] = title?.split("/n");
  useSplitTitleAnimation({
    trigger: "#home-hero-title",
    titleSelector: "#home-hero-title",
    start: "top 80%",
    end: "bottom 20%",
    direction: "left",
    duration: 1.8,
    stagger: 0.05,
  });
  // useGSAP(() => {
  //   const para = new SplitText(".gsap-para", { type: "lines" });
  //   const titleFirst = new SplitText(".title-first", { type: "chars, words" });
  //   const titleSecond = new SplitText(".title-second", {
  //     type: "chars, words",
  //   });

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "#home-hero",
  //       start: "-20% top",
  //       end: "bottom 80%",
  //       toggleActions: "restart none restart none",
  //     },
  //   });
  //   tl.from(
  //     para.lines,
  //     {
  //       opacity: 0,
  //       yPercent: 100,
  //       duration: 1.2,
  //       ease: "expo.out",
  //       stagger: 0.05,
  //     },
  //     "-=0.5",
  //   );

  //   tl.from(
  //     titleFirst.chars,
  //     {
  //       opacity: 0,
  //       yPercent: 100,
  //       duration: 1.2,
  //       ease: "expo.out",
  //       stagger: 0.05,
  //     },
  //     "-=0.5",
  //   );
  //   tl.from(
  //     titleSecond.chars,
  //     {
  //       opacity: 0,
  //       yPercent: 100,
  //       duration: 1.2,
  //       ease: "expo.out",
  //       stagger: 0.05,
  //     },
  //     "-=0.5",
  //   );
  // }, []);
  return (
    <div className="space-y-4">
      <p className="text-primary gsap-para self-start text-left text-sm font-medium sm:text-xl">
        {subTitle}
      </p>

      <h1
        className={`xs:text-3xl ${inter.className} text-primary text-3xl leading-[1.1] font-semibold md:text-5xl lg:text-7xl`}
        id="home-hero-title"
      >
        <span className={`title-first`}>{first}</span>
        <br />
        <span className={`title-second ml-0 font-normal sm:ml-20`}>
          {second}
        </span>
      </h1>
    </div>
  );
}
