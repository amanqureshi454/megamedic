"use client";
import React, { useState } from "react";
import NewsCategories from "./NewsCategories";
import RelatedPost from "./RelatedPost";
import TagsBox from "./TagsBox";
import CompanyInfo from "./CompanyInfo";
import AuthorInfoBox from "./AuthorInfoBox";

export default function MobileSidebar({ categories, relatedPosts, data }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => setShow((show) => !show)}
        className="group relative z-20 flex h-fit w-fit cursor-pointer justify-end px-4 duration-300 active:translate-y-1 lg:hidden"
      >
        {!show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="group-hover:text-primary size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="group-hover:text-primary size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>

      {show && (
        <div className="absolute top-0 right-0 h-full w-[70%] space-y-6 bg-white p-6 shadow-2xl">
          <AuthorInfoBox data={data} />

          {/* categories */}
          <NewsCategories categories={categories} />

          {/* related posts */}
          <RelatedPost relatedPosts={relatedPosts} />

          {/* Tags */}
          <TagsBox data={data} />
          <CompanyInfo data={data} />
        </div>
      )}
    </>
  );
}
