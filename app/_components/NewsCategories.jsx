import Link from "next/link";
import React from "react";

export default function NewsCategories({ categories }) {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-lg font-bold sm:text-2xl">Post categories</h2>
        <div className="flex items-center gap-2">
          <div className="bg-primary h-1 w-[30%] rounded-2xl" />
          <div className="bg-gray-background h-1 w-[70%] rounded-2xl" />
        </div>
      </div>
      <ul className="mt-4 space-y-6">
        {categories?.map((category) => {
          return (
            <li
              key={category.id}
              className="flex cursor-pointer items-center justify-between text-sm text-neutral-600 hover:text-blue-700 sm:text-base"
            >
              <Link
                href={`/news/category/${category?.slug}`}
                className="flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-3 sm:size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
                <span className="hover:underline">{category?.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
