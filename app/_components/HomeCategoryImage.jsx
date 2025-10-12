"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";

export default function HomeCategoryImage({ image }) {
  useGSAP(() => {
    gsap.from("#cat-img", {
      clipPath: "polygon(38% 0%, 38% 0%, 35% 100%, 35% 100%)",
      duration: 1.8,
      yPercent: 100,
      ease: "circ.inOut",
      scale: 0,
      scrollTrigger: {
        trigger: "#home-hero",
        start: "30% center",
      },
    });
  }, []);
  return (
    <Image
      style={{
        clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
      }}
      src={image}
      width={800}
      height={800}
      alt="categories"
      id="cat-img"
      className="object-contain sm:-mt-3"
    />
  );
}
