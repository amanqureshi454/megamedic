import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDateTime, getImageUrl } from "../_lib/helpers";

export default function RelatedPost({ relatedPosts }) {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-lg font-bold sm:text-2xl">Related Posts</h2>
        <div className="flex items-center gap-2">
          <div className="bg-primary h-1 w-[30%] rounded-2xl" />
          <div className="bg-gray-background h-1 w-[70%] rounded-2xl" />
        </div>
      </div>
      <ul className="mt-4 space-y-6">
        {relatedPosts?.map((post) => {
          return (
            <li key={post?.id} className="flex flex-wrap gap-2">
              <Image
                src={getImageUrl(post?.image)}
                width={100}
                alt={post?.title}
                height={100}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="line-clamp-2 text-sm leading-[1.2] font-semibold sm:text-base">
                  <Link
                    href={`/news/${post?.slug}`}
                    className="hover:underline"
                  >
                    {post?.title}
                  </Link>
                </h3>
                <p className="text-xs text-neutral-600 sm:text-sm">
                  {formatDateTime(post?.newsCreationTime)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
