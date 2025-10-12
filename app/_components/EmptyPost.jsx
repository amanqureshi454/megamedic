"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function EmptyPost() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4 h-16 w-16 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m1 4H7a2 2 0 01-2-2V7a2 2 0 012-2h3l2-2h4a2 2 0 012 2v14a2 2 0 01-2 2z"
        />
      </svg>
      <h2 className="text-2xl font-semibold">No posts found</h2>
      <p className="mt-2 text-sm">
        Please check back later or try a different category.
      </p>
      <button
        onClick={() => router.back()}
        className="mt-6 cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-700"
      >
        ← Go Back
      </button>
    </div>
  );
}
