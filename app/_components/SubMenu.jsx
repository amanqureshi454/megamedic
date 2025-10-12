import Image from "next/image";
import Link from "next/link";
import { useNav } from "../_context/NavProvider";

export default function SubMenu() {
  const {
    setMenuLevel,
    mainNavActiveItem,
    categories,
    partners,
    setSelectedCategory,
    handleMenu,
  } = useNav();

  return (
    <ul className="flex flex-col items-start justify-start gap-4 pl-4 text-base text-white sm:pt-20 sm:text-3xl">
      {mainNavActiveItem === "categories" &&
        categories?.map((item) => {
          return (
            <li
              key={item?.id}
              className="group dash-hover-mini relative w-full cursor-pointer capitalize"
            >
              <Link
                href={`/categories/${item.slug}`}
                className="block cursor-pointer duration-500 group-hover:translate-x-4"
                onClick={() => {
                  handleMenu();
                  setSelectedCategory(item?.slug);
                }}
              >
                {item?.name}
              </Link>
              <Image
                src={"/icons/right-arrow-white.svg"}
                width={10}
                height={10}
                alt="right"
                className="absolute top-1/2 right-0 block -translate-y-1/2 md:hidden"
              />
            </li>
          );
        })}

      {mainNavActiveItem === "partners" &&
        partners?.map((item) => {
          return (
            <li
              key={item?.id}
              className="group dash-hover-mini relative w-full cursor-pointer capitalize"
            >
              <Link
                href={`/categories/${item.slug}`}
                className="block cursor-pointer duration-500 group-hover:translate-x-4"
                onClick={() => {
                  handleMenu();
                  setSelectedCategory(item?.slug);
                }}
              >
                {item?.name}
              </Link>
              <Image
                src={"/icons/right-arrow-white.svg"}
                width={10}
                height={10}
                alt="right"
                className="absolute top-1/2 right-0 block -translate-y-1/2 md:hidden"
              />
            </li>
          );
        })}
    </ul>
  );
}
