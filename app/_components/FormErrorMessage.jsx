import React from "react";

export default function FormErrorMessage({ errorMessage }) {
  return (
    <>
      {errorMessage?.length > 0 && (
        <div className="-mb-4 space-y-2 rounded-2xl bg-red-300 px-2 py-1.5 text-center text-sm text-red-700 capitalize">
          {errorMessage?.map((error, index) => {
            return (
              <p key={index}>
                {index + 1}).
                {error}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
}
