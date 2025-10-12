import React from "react";

export default function ToggleFilter({ setShowFlter }) {
  return (
    <button
      onClick={() => setShowFlter((show) => !show)}
      className="bg-primary xs:mb-6 mb-2 block w-full rounded-full py-2.5 text-xl font-medium text-white md:hidden"
    >
      Filter
    </button>
  );
}
