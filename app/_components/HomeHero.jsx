"use client";

import Image from "next/image";
import HeroContent from "./HeroContent";
import { getImageUrl } from "../_lib/helpers";
import HomeCategoryImage from "./HomeCategoryImage.jsx";
import HomeHero3D from "./HomeHero3D.jsx";
import { Suspense } from "react";

export default function HomeHero({ data }) {
  const mobileBg = getImageUrl(data?.mobileBg);
  const desktopBg = getImageUrl(data?.desktopBg);
  const categoryImage = getImageUrl(data?.image);

  return (
    <section
      className="relative flex min-h-[80vh] justify-center pb-20 sm:min-h-[110dvh]"
      id="home-hero"
    >
      {/* overlay */}
      <div className="absolute top-[50%] left-0 h-[50%] w-full bg-gradient-to-b from-transparent via-transparent to-[#F6F2FB]" />
      <Suspense fallback={null}>
        <HomeHero3D />
      </Suspense>

      {/* Mobile Image */}
      <Image
        src={mobileBg}
        fill
        alt="home hero mobile"
        priority
        sizes="100vw"
        className="-z-1 object-cover sm:hidden"
      />

      {/* Desktop Image */}
      <Image
        // src={data?.desktopBg.url}
        src={desktopBg}
        fill
        alt="home hero desktop"
        priority
        sizes="100vw"
        className="-z-1 hidden sm:block"
      />

      <div className="xs:gap-8 pointer-events-none absolute top-[15%] flex w-[90%] flex-col items-center gap-6">
        <HeroContent title={data?.title} subTitle={data?.subTitle} />
      </div>

      {/* <HomeCategoryImage image={categoryImage} /> */}
      {/* 
       <Image
        src={"/Ellipse 1.png"}
        width={100}
        height={100}
        alt="design"
        className="absolute bottom-0 left-0 block h-[300px] w-full translate-y-[20%]"
      />

       <Image
        src={"/Ellipse 2.png"}
        width={100}
        height={100}
        className="absolute -bottom-0 opacity-100 left-0 block h-[300px] w-full translate-y-[50%]"
        alt="design"
      />    */}
    </section>
  );
}
