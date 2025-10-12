// useRevealOnScroll.js
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useRevealOnScroll = ({
  selector,
  trigger = selector,
  start = "top 80%",
  duration = 1,
  yPercent = 50,
  ease = "expo.out",
  delay = 0,
  stagger = 0.05,
}) => {
  useGSAP(() => {
    gsap.from(selector, {
      scrollTrigger: {
        trigger,
        start,
      },
      opacity: 0,
      yPercent,
      duration,
      ease,
      delay,
      stagger,
    });
  }, []);
};
