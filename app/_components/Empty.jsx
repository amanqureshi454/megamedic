import React from "react";

export default function Empty({ name = "data" }) {
  return (
    <div className="flex items-center justify-center p-4 text-red-500">
      <p>
        No <strong className="capitalize">{name}</strong> found
      </p>
    </div>
  );
}
