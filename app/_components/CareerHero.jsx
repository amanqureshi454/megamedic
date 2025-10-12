"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Markdown from "react-markdown";
import { useRevealOnScroll } from "../_gsap/useRevealOnScroll";
import { useSplitTitleAnimation } from "../_gsap/useSplitTitleAnimation";
import { getImageUrl } from "../_lib/helpers";

export default function CareerHero({ data }) {
  const isImage = data?.image;
  const imageUrl = getImageUrl(isImage);

  useSplitTitleAnimation({
    trigger: "#career-hero",
    titleSelector: "#career-hero h1",
    start: "top 40%",
    direction: "left",
    duration: 4,
    stagger: 0.05,
  });
  useRevealOnScroll({
    selector: "#career-para",
    duration: 2,
    yPercent: 200,
  });

  useGSAP(() => {
    gsap.to("#career-img", {
      clipPath: "circle(100% at 50% 50%)",
      duration: 1.8,
      ease: "circ.inOut",
    });
  }, []);
  return (
    <div id="career-hero">
      {/* <Image
        src={imageUrl}
        width={1000}
        height={1000}
        alt="news"
        id="career-img"
        style={{
          clipPath: "circle(0% at 50% 50%)",
        }}
        className="absolute -inset-y-[05%] -right-[50%] max-w-[120%] bg-contain sm:-inset-y-[15%] sm:-right-[20%] sm:max-w-[85%] md:-inset-y-[20%] lg:-inset-y-[35%] lg:max-w-[80%]"
      /> */}
      <section className="relative z-20 mx-auto my-20 w-[85%] space-y-4">
        <div className="grid grid-cols-1 justify-between gap-12 lg:grid-cols-[.8fr_1fr]">
          <div>
            <h1 className="text-[24px] tracking-normal text-[#1C3141] md:text-[64px]">
              {data?.title}
            </h1>
            <div className="xs:text-base text-sm" id="career-para">
              <Markdown>{data?.description}</Markdown>
            </div>
          </div>
          <div className="flex lg:justify-end">
            <Image
              src={"/career-hero2.jpg"}
              alt="image"
              width={1000}
              height={1000}
              className="h-full w-full rounded-2xl lg:w-[716px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
