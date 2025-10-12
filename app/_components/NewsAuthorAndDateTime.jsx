import React from "react";
import { formatDateTime } from "../_lib/helpers";

export default function NewsAuthorAndDateTime({ newsData }) {
  return (
    <div
      id="intro"
      className="text-[9px]sm:text-base flex max-w-full items-center gap-2"
    >
      <span>Written By:</span>
      <span className="capitalize">
        <strong className="">{newsData?.authorInfo?.authorName}</strong>
      </span>
      <span>
        Created at:
        <strong className="ml-2">
          {formatDateTime(newsData?.newsCreationTime)}
        </strong>
      </span>
    </div>
  );
}
