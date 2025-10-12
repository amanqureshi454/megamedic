"use client";

import { useState } from "react";
import ProductCompany from "./ProductCompany";
import ProductSpecs from "./ProductSpecs";
import { getImageUrl } from "../_lib/helpers";
import Image from "next/image";
import Markdown from "react-markdown";

export default function ProductTabs({ product }) {
  const [active, setActive] = useState("specs");
  const [hoveredItem, setHoveredItem] = useState("");
  const imageUrl = getImageUrl(product?.company?.imageSection?.image);
  const videoUrl = getImageUrl(product?.company?.videoSection?.video);
  const finalImageUrl = imageUrl.startsWith("/default.png") ? false : imageUrl;
  const finalVideoUrl = videoUrl.startsWith("/default.png") ? false : videoUrl;
  return (
    <div
      className={`bg-gray-background flex flex-col overflow-hidden rounded-4xl`}
    >
      <ProductCompany
        product={product}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        active={active}
        setActive={setActive}
      />
      <ProductSpecs
        product={product}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        active={active}
        setActive={setActive}
      />
    </div>
    // <section className="bg-gray-background flex flex-col overflow-hidden rounded-4xl">
    //   {/* company */}
    //   <div
    //     className={`rounded-4xl ${
    //       active === "company" && hoveredItem !== "specs"
    //         ? "bg-primary order-1 text-white"
    //         : "text-blackish bg-gray-background -order-1"
    //     } ${hoveredItem === "company" && "!bg-primary text-white"} `}
    //     onMouseEnter={() => setHoveredItem("company")}
    //     onMouseLeave={() => setHoveredItem("")}
    //   >
    //     {product?.company && (
    //       <div className={`space-y-12 px-8 py-10 sm:px-14 sm:py-20`}>
    //         <h2
    //           onClick={() => {
    //             setActive("company");
    //           }}
    //           className="cursor-pointer text-4xl sm:text-6xl"
    //         >
    //           {product?.company?.title}
    //         </h2>

    //         {active === "company" && (
    //           <div className="grid grid-cols-1 items-start gap-10 sm:gap-20 lg:grid-cols-[0.7fr_1fr]">
    //             {/* image */}
    //             <div className="bg-gray-secondary relative h-[350px] w-full overflow-hidden rounded-2xl shadow-2xl sm:h-[450px]">
    //               {!finalImageUrl && <div className="bg-gray-secondary"></div>}
    //               {finalImageUrl && (
    //                 <Image
    //                   className="object-contain"
    //                   fill
    //                   alt={
    //                     product?.company?.imageSection?.image?.text ||
    //                     "Company Image"
    //                   }
    //                   src={finalImageUrl}
    //                 />
    //               )}
    //             </div>
    //             {/* image content */}
    //             <div className="space-y-6">
    //               <h2 className="text-xl sm:text-3xl">
    //                 {product?.company?.imageSection?.title}
    //               </h2>
    //               <p className="text-xs sm:text-xl">
    //                 {product?.company?.imageSection?.description}
    //               </p>
    //             </div>
    //             {/* video content */}
    //             <div className="order-2 space-y-6 lg:order-0">
    //               <h2 className="text-xl sm:text-3xl">
    //                 {product?.company?.videoSection?.title}
    //               </h2>
    //               <p className="text-xs sm:text-xl">
    //                 {product?.company?.videoSection?.description}
    //               </p>
    //             </div>

    //             {/* video */}
    //             <div className="bg-gray-secondary relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
    //               {!finalVideoUrl && <div className="bg-gray-secondary"></div>}
    //               {finalVideoUrl && (
    //                 <video
    //                   className="aspect-video"
    //                   src={finalVideoUrl}
    //                   autoPlay
    //                   loop
    //                   muted
    //                 ></video>
    //               )}
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     )}
    //   </div>

    //   {/* specs */}
    //   <div
    //     className={`rounded-4xl ${
    //       active === "specs" && hoveredItem !== "company"
    //         ? "bg-primary order-1 text-white"
    //         : "text-blackish bg-gray-background -order-1"
    //     } ${hoveredItem === "specs" && "!bg-primary text-white"} `}
    //     onMouseEnter={() => setHoveredItem("specs")}
    //     onMouseLeave={() => setHoveredItem("")}
    //   >
    //     {product?.specs && (
    //       <div className={`space-y-12 px-8 py-10 sm:px-14 sm:py-20`}>
    //         <h2
    //           onClick={() => {
    //             setActive("specs");
    //           }}
    //           className="cursor-pointer text-4xl sm:text-6xl"
    //         >
    //           {product?.specs?.title}
    //         </h2>

    //         {active === "specs" && (
    //           <div className="markdown-content grid grid-cols-1 items-start gap-y-10 pb-32 text-[15px] font-medium text-balance sm:text-lg md:grid-cols-[1fr_0.5fr]">
    //             <div className="prose prose-ul:flex prose-ul:flex-col prose-p:m-0 flex max-w-none flex-col gap-4 text-inherit">
    //               <Markdown>{product?.specs?.content}</Markdown>
    //             </div>

    //             <div className="relative -order-1 flex h-[300px] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#C4C4C4] shadow-2xl sm:h-[414px] md:order-1">
    //               <Image
    //                 width={500}
    //                 height={500}
    //                 src={imageUrl}
    //                 alt="image"
    //                 className="h-full w-full object-contain"
    //               />
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     )}
    //   </div>
    // </section>
  );
}
