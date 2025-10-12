"use client";
import Link from "next/link";
import { useNav } from "../_context/NavProvider";
import LineSkeleton from "./LineSkeleton";

export default function FooterLinks() {
  const { footerData } = useNav();
  const isMainLinks = footerData?.footer?.mainLink;
  if (!isMainLinks) return <LineSkeleton length={5} width={50} />;
  return (
    <ul className="xs:text-4xl [grid-column:1/-1] flex flex-col items-start gap-2 text-3xl capitalize md:col-span-1">
      {isMainLinks &&
        isMainLinks?.map((item) => {
          return (
            <li key={item?.id} className="relative">
              <Link className="underline-hover" href={`/${item?.url}`}>
                {item?.name}
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
