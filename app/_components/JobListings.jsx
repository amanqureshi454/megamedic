"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef, useState } from "react";
import Markdown from "react-markdown";
import { getImageUrl } from "../_lib/helpers";
import LinkButton from "./LinkButton";

export default function JobListings({ data }) {
  const jobs = data?.jobs;

  const sectionRefs = useRef([]);

  useGSAP(() => {
    sectionRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        opacity: 0,
        yPercent: 100,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  return (
    <>
      {/* sales manager */}
      {jobs?.map((job, index) => {
        return (
          <section
            key={job?.id}
            id="job-section"
            ref={(el) => (sectionRefs.current[index] = el)}
            className="relative z-20 mx-auto flex w-[85%] items-start justify-between border-t border-[#1C3141] py-6"
          >
            <div className="space-y-12">
              <div className="space-y-4">
                <h1 className="text-xl font-medium sm:text-3xl">
                  {job?.jobTitle}
                </h1>
                <div className="text-sm sm:text-base">
                  <Markdown>{job?.jobDescription}</Markdown>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {job?.types &&
                  job?.types?.map((type) => {
                    return (
                      <div
                        key={type?.id}
                        className="border-primary text-primary rounded-full border-2 px-4 py-1.5 text-lg font-medium capitalize"
                      >
                        {type?.text}
                      </div>
                    );
                  })}
              </div>
            </div>
            <LinkButton
              hoverColor="#fff"
              className="group relative z-20 flex w-fit items-center gap-4 self-end rounded-full px-4 py-2 text-lg font-medium text-white duration-300 hover:scale-95 hover:cursor-pointer hover:shadow-2xl sm:self-start"
              // href={job?.apply?.url}
              href={"/contact"}
            >
              <span className="group-hover:text-primary relative z-20 duration-300">
                {job?.apply?.text}
              </span>
              <Image
                width={14}
                height={14}
                alt={job?.apply?.text}
                src={getImageUrl(job?.apply?.icon)}
                className="-rotate-45 transition-all duration-300 group-hover:rotate-0"
              />
            </LinkButton>
          </section>
        );
      })}
    </>
  );
}
