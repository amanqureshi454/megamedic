"use client";
import Image from "next/image";
import React from "react";
import Empty from "./Empty";
import { getImageUrl } from "../_lib/helpers";
import { useRevealOnScroll } from "../_gsap/useRevealOnScroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function OurTeam({ data }) {
  const members = data?.members;

  if (!members || members?.length === 0) return <Empty name="Members" />;

  useRevealOnScroll({
    selector: "#our-team-title",
    delay: 0.5,
  });
  useGSAP(() => {
    gsap.from(
      "#members #test",
      {
        scrollTrigger: {
          trigger: "#members",
          start: "top center",
        },
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        stagger: 0.05,
      },
      "-=0.5",
    );
  }, []);
  return (
    <div className="mx-auto w-[85%] space-y-8 py-10">
      <h2
        className="text-primary text-2xl font-medium sm:text-3xl"
        id="our-team-title"
      >
        {data?.title}
      </h2>
      <div
        className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        id="members"
      >
        {members.map((item, index) => {
          return (
            <div key={index} className="space-y-4" id="test">
              <div className="group bg-gray-secondary relative aspect-square max-w-[350px] overflow-hidden rounded-lg">
                {/* Image */}
                <Image
                  src={getImageUrl(item?.image)}
                  alt={item?.name}
                  fill
                  className="object-cover duration-300 group-hover:scale-105"
                />

                {/* Overlay with text */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 px-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-white">
                    {item?.description
                      ? item?.description
                      : "No description available"}
                  </p>
                </div>
              </div>

              {/* Name + designation below */}
              <div>
                <h3 className="text-2xl font-medium">{item?.name}</h3>
                <p>{item?.designation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
