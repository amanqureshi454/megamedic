"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-black text-white">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="text-gray-400">
        We’re working to fix it. Please try again later.
      </p>
      <button
        onClick={() => reset()}
        className="cursor-pointer rounded-md bg-white px-4 py-2 text-black"
      >
        Retry
      </button>
    </div>
  );
}
