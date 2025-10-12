"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // fake loading progress simulation
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 2; // increase speed as you like
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white">
      {/* Logo */}
      <Image
        src={"/green-logo.svg"}
        alt="Logo"
        width={200}
        height={200}
        className="mb-6 animate-pulse"
      />

      {/* Percentage text */}
      <div className="mb-2 text-xl font-semibold text-gray-700">
        {progress}%
      </div>

      {/* Progress bar (optional) */}
      <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-200">
        <div
          className="bg-primary h-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
