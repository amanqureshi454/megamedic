import Image from "next/image";
import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";
import { getImageUrl } from "../_lib/helpers";

export default function NewsHero({ data }) {
  const imageUrl = getImageUrl(data?.image);
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_.7fr]">
      {/* content box */}
      <div className="space-y-4">
        <h2 className="text-primary relative w-fit text-2xl font-semibold capitalize sm:text-3xl">
          <Link className="underline-hover" href={`/news/${data?.slug}`}>
            {data?.subTitle}
          </Link>
        </h2>
        <h1 className="xs:text-3xl text-2xl leading-[1.3] decoration-2 duration-300 hover:underline sm:text-5xl">
          <Link href={`/news/${data?.slug}`}>{data?.title}</Link>
        </h1>
        <div className="text-sm sm:text-lg">
          <Markdown>{data?.description}</Markdown>
        </div>
      </div>
      {/* image box */}
      {/* <div className="relative h-[250px] max-h-[100%] w-[500px] max-w-[100%] justify-self-center overflow-hidden rounded-2xl sm:h-[500px]"> */}
      <Image
        src={imageUrl}
        width={500}
        height={500}
        alt="news"
        className="h-[300px] w-full rounded-2xl object-cover duration-300 hover:scale-105"
      />
      {/* </div> */}
    </div>
  );
}
