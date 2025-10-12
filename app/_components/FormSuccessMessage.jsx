import React from "react";

export default function FormSuccessMessage({ successMessage }) {
  return (
    <>
      {successMessage && (
        <p className="-mb-4 animate-bounce rounded-2xl bg-green-300 px-2 py-1.5 text-center text-green-900 capitalize">
          {successMessage}
        </p>
      )}
    </>
  );
}
