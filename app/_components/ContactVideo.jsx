"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { getImageUrl } from "../_lib/helpers";

export default function ContactVideo({ data }) {
  const [show, setShow] = useState(false);
  const imageUrl = getImageUrl(data?.cta?.icon);

  return (
    <>
      {/* show on big screen */}
      <div
        id="contact-video"
        className="relative hidden aspect-video items-end overflow-hidden lg:flex"
      >
        {/* Video with mask */}
        <div className="mask-image bg-gray-secondary absolute inset-0 w-full">
          {/* <motion.div
            animate={{ opacity: show ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
            style={{ pointerEvents: show ? "none" : "auto" }} // So map doesn't block interaction
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/0IiKOM0GkPQ?autoplay=1&mute=1&loop=1&playlist=0IiKOM0GkPQ&controls=0&modestbranding=1&rel=0"
              title="YouTube Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="h-full w-full"
            />
          </motion.div> */}

          {/* Google Map */}
          <motion.div
            // animate={{ opacity: show ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
            style={{ pointerEvents: show ? "auto" : "none" }}
          >
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              className="h-full w-full"
              src="https://www.google.com/maps?q=Bernstrasse+18,+2555+Brügg,+Switzerland&output=embed"
              allowFullScreen
            />
          </motion.div>
        </div>

        {/* Floating Button */}
        <button
          // onClick={() => setShow((show) => !show)}
          className="!bg-primary button-hover hover:text-primary group relative mb-4 flex cursor-pointer items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-xl font-medium !text-white capitalize transition-all duration-300 hover:scale-95 active:scale-90 2xl:px-6 2xl:py-3 2xl:text-2xl"
        >
          <span className="relative z-50">{data?.cta?.text || "Explore"}</span>
          <Image
            className="-rotate-45 duration-300 group-hover:rotate-0"
            width={14}
            height={14}
            alt={data?.cta?.text || "Arrow"}
            src={imageUrl}
          />
        </button>
      </div>

      {/* show in small screen */}
      <div className="block space-y-4 lg:hidden">
        <div className="bg-gray-secondary relative aspect-video w-full overflow-hidden rounded-xl">
          {/* YouTube Video */}
          {/* <motion.div
            animate={{ opacity: show ? 0 : 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
            style={{ pointerEvents: show ? "none" : "auto" }}
          >
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/0IiKOM0GkPQ?autoplay=1&mute=1&loop=1&playlist=0IiKOM0GkPQ&controls=0&modestbranding=1&rel=0"
              title="YouTube Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </motion.div> */}

          {/* Google Map */}
          <motion.div
            // animate={{ opacity: show ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
            style={{ pointerEvents: show ? "auto" : "none" }}
          >
            <iframe
              className="h-full w-full rounded-xl"
              loading="lazy"
              src="https://www.google.com/maps?q=Bernstrasse+18,+2555+Brügg,+Switzerland&output=embed"
              allowFullScreen
            />
          </motion.div>
        </div>
        <button
          // onClick={() => setShow((show) => !show)}
          className="bg-primary group relative mb-4 flex cursor-pointer items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-xl font-medium text-white capitalize transition-all duration-300 hover:scale-95 active:scale-90 2xl:px-6 2xl:py-3 2xl:text-2xl"
        >
          <span className="relative z-50">{data?.cta?.text || "Explore"}</span>
          <Image
            className="-rotate-45 duration-300 group-hover:rotate-0"
            width={14}
            height={14}
            alt={data?.cta?.text || "Arrow"}
            src={imageUrl}
          />
        </button>
      </div>
    </>
  );
}
