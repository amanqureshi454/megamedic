"use client";
import Link from "next/link";
import { useNav } from "../_context/NavProvider";

export default function SubMenuItems() {
  const { handleMenu, productsByCategory } = useNav();
  return (
    <ul className="relative flex flex-col justify-start space-y-4 pl-4 text-base text-white sm:pt-20 sm:text-2xl">
      {productsByCategory.map((item) => {
        return (
          <li
            onClick={handleMenu}
            key={item?.id}
            className="dash-hover-mini group relative capitalize"
          >
            <Link
              className="line-clamp-1 duration-300 group-hover:translate-x-7"
              href={`/products/${item?.slug}`}
            >
              {item?.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
