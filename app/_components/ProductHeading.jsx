"use client";
import { useGSAP } from "@gsap/react";
import { useRevealOnScroll } from "../_gsap/useRevealOnScroll";
import { useSplitLinesAnimation } from "../_gsap/useSplitLineAnimation";
import { useSplitTitleAnimation } from "../_gsap/useSplitTitleAnimation";
import { useTitleCharsAnimation } from "../_gsap/useTitleCharsAnimation";
import gsap from "gsap";

export default function ProductHeading({ product }) {
  useTitleCharsAnimation({
    trigger: "#product-detail",
    target: "#product-detail #cat-part h3",
    start: "top 60%",
    duration: 1.8,
    stagger: 0.02,
  });

  useGSAP(() => {
    gsap.from("#product-detail #title", {
      x: -100, // left se start
      opacity: 0, // fade-in
      duration: 1.8, // animation speed
      delay: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#product-detail #title",
        start: "top 80%", // jab viewport me aaye
      },
    });
  }, []);

  return (
    <div id="cat-part" className="space-y-10 sm:space-y-20">
      <div className="space-y-2">
        {product?.categories?.length > 0 && (
          <div className="flex items-center gap-2">
            {product?.categories?.map((cat) => {
              return (
                <h3
                  key={cat?.id}
                  className="text-primary text-3xl font-semibold"
                >
                  {cat?.name}
                </h3>
              );
            })}
          </div>
        )}
        {/* {product?.partners?.length > 0 && (
          <div className="flex items-center gap-2">
            {product?.partners?.map((partner) => {
              return (
                <h3
                  key={partner?.id}
                  className="text-primary text-3xl font-semibold capitalize"
                >
                  {partner?.name}
                </h3>
              );
            })}
          </div>
        )} */}
      </div>

      <h1
        id="title"
        className="text-3xl leading-[1.3] font-medium capitalize md:text-[50px]"
      >
        {product?.name}
      </h1>
    </div>
  );
}
