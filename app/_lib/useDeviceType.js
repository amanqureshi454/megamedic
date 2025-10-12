import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useState, useEffect } from "react";

gsap.registerPlugin(Observer, useGSAP);

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isDesktop: true,
    isTouch: false,
    screenWidth: 0,
  });

  const checkDeviceType = () => {
    const width = window.innerWidth;
    const isMobile = width < 768;
    const isDesktop = !isMobile;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    setDeviceType({
      isMobile,
      isDesktop,
      isTouch,
      screenWidth: width,
    });
  };

  useEffect(() => {
    checkDeviceType();
  }, []);

  return deviceType;
};
