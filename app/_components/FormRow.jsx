import React from "react";

export default function FormRow({ label, children, extendCols = 1 }) {
  return (
    <div
      className="flex flex-col gap-1"
      style={{
        gridColumn: `span ${extendCols}/ span ${extendCols}`,
      }}
    >
      <label
        className="inline-block text-xs sm:text-base"
        htmlFor={children?.props?.id}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
