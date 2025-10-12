import Image from "next/image";
import React from "react";
import { formatDateTime, getImageUrl } from "../_lib/helpers";
import Link from "next/link";

export default function NewsCard({ post }) {
  return (
    <div key={post?.id} className="space-y-4 overflow-hidden pb-10">
      <Image
        width={500}
        height={500}
        alt="image"
        src={getImageUrl(post?.image)}
        className="h-[300px] w-full rounded-2xl object-cover duration-300 hover:scale-105"
      />
      <div className="text-primary flex items-center gap-4 text-[9px] sm:text-sm">
        <p>By {post?.authorInfo?.authorName}</p>
        <div className="bg-primary size-1.5 rounded-full" />
        <p>{formatDateTime(post?.newsCreationTime)}</p>
      </div>
      <div className="space-y-4">
        <h3 className="hover:text-primary line-clamp-2 text-xl font-semibold text-neutral-600 duration-300 hover:underline">
          <Link href={`/news/${post?.slug}`}> {post?.title}</Link>
        </h3>

        <p className="line-clamp-4 text-sm">{post?.description}</p>
      </div>
    </div>
  );
}
