import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useNav } from "../_context/NavProvider";
import { getImageUrl } from "../_lib/helpers";
import LogoSkeleton from "./LogoSkeleton";

gsap.registerPlugin(ScrollTrigger);

export default function Logo() {
  const { mainNavigations, menuLevel } = useNav();
  const isLogoRendered = mainNavigations?.header?.logo;
  const whiteLogoUrl = getImageUrl(isLogoRendered?.whiteImage);
  const greenLogoUrl = getImageUrl(isLogoRendered?.greenImage);

  // show dummy skeleton in case of no image

  // useGSAP(() => {
  //   if (!isLogoRendered) return;
  //   // Scroll Trigger Animation
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: document.body, // ya koi specific trigger
  //       start: "top top",
  //       end: "bottom top",
  //       scrub: 1.5,
  //     },
  //   });

  //   // Scroll down par left move
  //   tl.to(".logo-link", {
  //     x: -10, // jitna left le jana ho (negative X)
  //     ease: "expo.out",
  //   });

  //   return () => {
  //     // Cleanup
  //     tl.kill();
  //   };
  // }, [isLogoRendered]);

  if (!isLogoRendered) return <LogoSkeleton />;
  return (
    <Link
      href={isLogoRendered && isLogoRendered?.url}
      className="logo-link relative z-30 block duration-300 hover:scale-95"
    >
      <Image
        src={menuLevel === "items" ? whiteLogoUrl : greenLogoUrl}
        width={200}
        height={200}
        alt={isLogoRendered && isLogoRendered?.text}
        className="xs:w-52 w-28"
      />
    </Link>
  );
}
