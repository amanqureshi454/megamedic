"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { getImageUrl } from "../_lib/helpers";

export default function AutoSwiperSlider({
  images = [],
  speed = 8000,
  spaceBetween = 30,
  direction = "ltr",
  className = "",
}) {
  let extendedImages = images;
  if (images.length <= 4) {
    extendedImages = [...images, ...images]; // Duplicate to allow smooth loop
  }
  return (
    <Swiper
      grabCursor={true}
      loop={true}
      dir={direction}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      modules={[Autoplay]}
      speed={speed}
      spaceBetween={spaceBetween}
      breakpoints={{
        320: { slidesPerView: 2 }, // Mobile
        640: { slidesPerView: 3 }, // Small tablet
        1024: { slidesPerView: 4 }, // Desktop
      }}
      className={className}
    >
      {extendedImages?.map((slide, index) => (
        <SwiperSlide key={index}>
          {/* <div className={`mx-auto h-[50px] w-[50px] overflow-hidden`}> */}
          <div className="flex items-center justify-center max-h-[88px] md:max-h-[100px] xl:max-h-[120px] 2xl:max-h-[150px]">
            <Image
              width={500}
              height={500}
              src={getImageUrl(slide?.image)}
              alt={slide?.image?.name}
              className="object-contain w-[55%] h-full"
              priority={index < 5}
            />
          </div>
          {/* </div> */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
