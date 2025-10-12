"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import NewsCard from "./NewsCard";
import Fuse from "fuse.js";

const relatedItems = [
  { id: 4000, src: "/news1.png" },
  { id: 4001, src: "/news2.png" },
  { id: 4002, src: "/news3.png" },
];
export default function RelatedNews({ data }) {
  const [query, setQuery] = useState("");
  // Configure Fuse
  const fuse = useMemo(() => {
    return new Fuse(data, {
      keys: [
        "title",
        "description",
        "tags.name", // if tags is an array of objects
        "news_categories.name", // if categories is also array of objects
        "richText",
      ],
      threshold: 0.3, // lower = stricter, higher = more fuzzy
    });
  }, [data]);

  const results = query
    ? fuse.search(query).map((result) => result.item)
    : data;

  return (
    <div className="mt-10 space-y-10 sm:mt-40">
      <div className="grid w-full grid-cols-1 items-center justify-between gap-4 sm:grid-cols-2 sm:gap-0">
        <h2 className="text-primary text-lg font-semibold sm:text-3xl">
          Explore more news items
        </h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-background min-h-14 w-full rounded-full border-none px-4 outline-none"
          placeholder="search post"
        />
      </div>
      {/* <div className="news">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Pagination]}
          className="mySwiper xs:min-h-[400px] relative min-h-[270px] w-full"
        >
          {relatedItems.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <Image
                  src={item.src}
                  width={400}
                  height={400}
                  alt="news"
                  className="rounded-xl"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div> */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results?.length > 0 ? (
          results?.map((post) => <NewsCard key={post?.id} post={post} />)
        ) : (
          <div className="[grid-column:1/-1] p-6 text-center text-sm text-gray-500">
            <p className="text-lg font-semibold">
              No posts found with "{query}" keyword
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Please check back later or try adjusting your filters.
            </p>
          </div>
        )}
      </div>
      <div className="text-center">
        <button className="bg-primary button-hover cursor-pointer rounded-full px-8 py-3 text-lg font-semibold text-white">
          <span className="relative z-10">Explore more</span>
        </button>
      </div>
    </div>
  );
}
