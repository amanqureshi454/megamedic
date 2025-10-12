import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const useSplitLinesAnimation = ({
  trigger,
  descriptionSelector,
  start = "top 50%",
  duration = 1.2,
  stagger = 0.03,
  delay = 0,
  ease = "expo.out",
  yPercent = 100,
}) => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start,
      },
    });

    const description = new SplitText(descriptionSelector, {
      type: "lines",
      linesClass: "split-line",
    });

    tl.from(description.lines, {
      opacity: 0,
      yPercent,
      duration,
      ease,
      delay,
      stagger,
    });
  }, []);
};
