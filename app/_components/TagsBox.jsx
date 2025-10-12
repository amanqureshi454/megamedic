import Link from "next/link";
import React from "react";

export default function TagsBox({ data }) {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-lg font-bold sm:text-2xl">Tags</h2>
        <div className="flex items-center gap-2">
          <div className="bg-primary h-1 w-[30%] rounded-2xl" />
          <div className="bg-gray-background h-1 w-[70%] rounded-2xl" />
        </div>
      </div>
      <ul className="mt-4 flex flex-wrap gap-4">
        {data?.tags?.map((tag) => {
          return (
            <li
              key={tag?.id}
              className="bg-primary button-hover2 cursor-pointer rounded-full px-4 py-2 text-white capitalize"
            >
              <Link className="relative z-20 text-sm sm:text-base" href={"#"}>
                {tag?.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
