import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getImageUrl } from "../_lib/helpers";

export default function AuthorInfoBox({ data }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative size-[100px] rounded-full sm:size-[200px]">
        <Image
          src={getImageUrl(data?.authorInfo?.image)}
          fill
          alt={data?.authorInfo?.authorName}
          className="rounded-full object-cover"
        />
      </div>
      <h3 className="text-sm font-bold text-neutral-700 sm:text-lg">
        {data?.authorInfo?.authorName}
      </h3>
      <p className="text-center text-xs font-light text-neutral-500 sm:text-base">
        {data?.authorInfo?.authorShortDescription}
      </p>

      {/* social icons */}
      <ul className="flex items-center gap-4">
        {data?.authorInfo?.icons?.map((icon) => {
          return (
            <li
              key={icon?.id}
              className="bg-gray-background flex size-6 cursor-pointer items-center justify-center rounded-full duration-300 hover:scale-90 sm:size-10"
            >
              <Link
                href={icon?.url}
                className="flex items-center justify-center"
              >
                <Image
                  width={15}
                  height={15}
                  src={getImageUrl(icon?.icon)}
                  alt={icon?.text}
                  className="w-[70%] sm:w-full"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
