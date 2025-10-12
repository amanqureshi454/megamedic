"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import "swiper/css";
import "swiper/css/autoplay";
import AutoSwiperSlider from "./AutoSwipperSlider";
import { useSplitTitleAnimation } from "../_gsap/useSplitTitleAnimation";

export default function OurPartners({ data }) {
  const leftCarousel = data?.leftCarousel?.images;
  const rightCarousel = data?.rightCarousel?.images;
  const spaceBetweenItems = data?.spaceBetweenItems;
  const speed = data?.speed;

  useSplitTitleAnimation({
    trigger: "#title",
    titleSelector: "#title",
    start: "top 80%",
    end: "bottom 20%",
    direction: "left",
    duration: 1.8,
    stagger: 0.05,
  });

  // useGSAP(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "#our-partner",
  //       start: "top 75%",
  //       end: "bottom 80%",

  //       toggleActions: "restart none restart none",
  //     },
  //   });
  //   const title = new SplitText("#our-partner #title", {
  //     type: "chars, words",
  //   });

  //   tl.from(title.chars, {
  //     opacity: 0,
  //     yPercent: 100,
  //     duration: 1.8,
  //     ease: "expo.out",
  //     stagger: 0.02,
  //   });
  // }, []);
  return (
    <section
      className="bg-primary relative min-h-[400px] py-6 text-white"
      id="our-partner"
    >
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <h3
          className="xs:text-lg px-4 text-center text-base font-semibold sm:px-0"
          id="title"
        >
          {data?.title}
        </h3>

        <div className="mt-12 w-full space-y-14">
          <AutoSwiperSlider
            spaceBetween={spaceBetweenItems}
            speed={speed}
            images={leftCarousel}
          />
          <AutoSwiperSlider
            spaceBetween={spaceBetweenItems}
            speed={speed}
            images={rightCarousel}
            direction="rtl"
          />
        </div>
      </div>
    </section>
  );
}
