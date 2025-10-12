import Image from "next/image";
import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";
import { getImageUrl } from "../_lib/helpers";

export default function ContactSupport({ data }) {
  const infoBlocks = data?.infoBlocks;
  const socialBlock = data?.socialBlock;

  return (
    <div className="bg-primary flex-1 space-y-12 rounded-2xl p-6 text-white">
      {/* office */}

      {infoBlocks?.map((item) => {
        return (
          <div key={item.id} className="space-y-3 font-medium">
            <h3 className="text-2xl sm:text-4xl">{item?.label}</h3>
            <Markdown>{item?.value?.replace(/\n/g, "  \n")}</Markdown>
          </div>
        );
      })}

      {/* Follow */}
      <div className="space-y-3 font-medium">
        <h3 className="text-2xl sm:text-4xl">{socialBlock?.title}</h3>
        <div className="flex items-center gap-2">
          {socialBlock?.icons?.map((item) => {
            return (
              <Link
                className="duration-300 hover:scale-105"
                key={item?.id}
                href={item?.url}
              >
                <Image
                  width={25}
                  height={25}
                  alt={item?.text}
                  src={getImageUrl(item?.whiteImage || item?.greenImage)}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
