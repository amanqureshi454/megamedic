"use client";
import React from "react";
import { inter } from "../_lib/font";
import Markdown from "react-markdown";
import { useSplitTitleAnimation } from "../_gsap/useSplitTitleAnimation";
import { useSplitLinesAnimation } from "../_gsap/useSplitLineAnimation";

export default function AboutInnovation({ data }) {
  useSplitTitleAnimation({
    trigger: "#innovative-section",
    titleSelector: "#innovative-section #gsap-title",
    start: "top 40%",
    direction: "left",
    duration: 1.8,
    stagger: 0.05,
  });
  useSplitLinesAnimation({
    trigger: "#innovative-section",
    descriptionSelector: "#innovative-section p",
    start: "top 40%",
    duration: 1.8,
    delay: 1,
    stagger: 0.05,
  });
  return (
    <section className="mx-auto w-[85%] py-20" id="innovative-section">
      <div className="space-y-8 sm:w-[80%]">
        <h2
          className={`${inter.className} text-3xl font-normal sm:leading-[1.2] md:text-4xl lg:w-[85%] lg:text-[72px]`}
          id="gsap-title"
        >
          {data?.title}
        </h2>
        <Markdown>{data?.description}</Markdown>
      </div>
    </section>
  );
}
