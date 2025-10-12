"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { getImageUrl } from "../_lib/helpers";

export default function Testimonilas({ data }) {
  const testimonials = data?.testimonials;
  return (
    <div className="mx-auto w-[85%] space-y-14 py-10 sm:py-20">
      <h2 className="text-primary text-3xl font-medium">{data?.title}</h2>
      <Swiper
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper xs:min-h-[300px] relative min-h-[400px] w-full md:min-h-[500px]"
      >
        {testimonials?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 gap-x-16 md:grid-cols-[1fr_1.5fr]">
                <Image
                  width={500}
                  height={500}
                  className="hidden max-h-[400px] max-w-[370px] overflow-hidden rounded-lg object-cover duration-300 hover:scale-105 md:block"
                  alt={item?.name}
                  src={getImageUrl(item?.image)}
                />
                <div className="space-y-11">
                  <h2 className="xs:text-2xl text-xl leading-[1.2] lg:text-[42px]">
                    {item?.quote}
                  </h2>
                  <div>
                    <h3 className="xs:text-2xl text-lg font-medium">
                      {item?.name}
                    </h3>
                    <p className="xs:text-xl text-lg font-light">
                      {item?.designation}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
