import React from "react";

export default function LineSkeleton({
  length,
  width = "100%",
  height = "16",
  color = "#34855b",
}) {
  return (
    <div className="space-y-4" style={{ width: `${width}%` }}>
      {Array.from({ length: length })?.map((_, i) => {
        return (
          <div
            key={i}
            className="w-full animate-pulse rounded-full"
            style={{ backgroundColor: color, height: `${height}px` }}
          />
        );
      })}
    </div>
  );
}
