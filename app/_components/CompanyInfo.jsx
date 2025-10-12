import Image from "next/image";
import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";
import { getImageUrl } from "../_lib/helpers";
import LinkButton from "./LinkButton";

export default function CompanyInfo({ data }) {
  return (
    <div className="bg-primary space-y-4 px-3 py-8 text-white sm:px-8 sm:py-14 2xl:px-14 2xl:py-14">
      <h2 className="text-lg font-bold sm:text-2xl 2xl:text-3xl">
        {data?.companyInfo?.title}
      </h2>
      <div className="prose max-w-none text-xs text-inherit sm:text-base">
        <Markdown>{data?.companyInfo?.description}</Markdown>
      </div>
      <LinkButton
        href={`/${data?.companyInfo?.cta?.url}`}
        className="text-primary flex cursor-pointer items-center justify-center gap-4 bg-white px-4 py-1.5 text-xs duration-300 outline-none sm:px-8 sm:py-2 sm:text-lg"
      >
        <span className="relative z-10">{data?.companyInfo?.cta?.text}</span>
        <svg
          width="13"
          height="14"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary fill-primary transition-all duration-300 group-hover:rotate-45"
        >
          <path
            d="M1 1.5H12M12 1.5V12.5M12 1.5L1 12.5"
            stroke="#34855b "
            strokeWidth="2"
          />
        </svg>
      </LinkButton>
    </div>
  );
}
