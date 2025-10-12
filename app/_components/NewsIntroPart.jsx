"use client";
import React from "react";
import { inter } from "../_lib/font";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import Image from "next/image";
import { getImageUrl } from "../_lib/helpers";
import NewsAuthorAndDateTime from "./NewsAuthorAndDateTime";

export default function NewsIntroPart({ newsData }) {
  const imageUrl = getImageUrl(newsData?.image);
  useGSAP(() => {
    const para = new SplitText("#news-subtitle", { type: "chars" });
    const title = new SplitText("#news-title", { type: " words" });

    gsap.from(para.chars, {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "expo.out",
      stagger: 0.05,
    });
    gsap.from(title.words, {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "expo.out",
      stagger: 0.05,
    });
    gsap.from("#intro", {
      x: -100,
      duration: 1,
      opacity: 0,
      ease: "circ.inOut",
    });
  }, []);
  return (
    <div className="relative mx-auto w-[90%] space-y-4 sm:p-6" id="news-single">
      <div className="relative z-10 mx-auto flex max-w-full flex-col gap-6 text-white">
        <h1
          id="news-title"
          className={`${inter.className} text-blackish text-xl leading-[1.3] font-semibold sm:text-3xl lg:text-5xl`}
        >
          {newsData?.title}
        </h1>
      </div>
      <NewsAuthorAndDateTime newsData={newsData} />
    </div>
  );
}
