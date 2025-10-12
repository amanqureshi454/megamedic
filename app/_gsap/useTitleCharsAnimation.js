import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function useTitleCharsAnimation({
  trigger,
  target,
  start = "top 70%",
  duration = 1.8,
  stagger = 0.05,
  ease = "expo.out",
}) {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start,
      },
    });

    const split = new SplitText(target, {
      type: "chars, words",
    });

    tl.from(split.chars, {
      opacity: 0,
      yPercent: 100,
      duration,
      ease,
      stagger,
    });

    return () => {
      split.revert();
      tl.kill();
    };
  }, []);
}
