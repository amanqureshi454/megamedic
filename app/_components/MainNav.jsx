import Link from "next/link";
import { useNav } from "../_context/NavProvider";
import LineSkeleton from "./LineSkeleton";

export default function MainNav() {
  const { setMenuLevel, handleMenu, mainNavigations, setMainNavActiveItem } =
    useNav();

  function handleClick(item) {
    if (
      item?.name?.toLowerCase() === "categories" ||
      item?.name?.toLowerCase() === "partners"
    ) {
      setMenuLevel("submenu");
      if (item?.name?.toLowerCase() === "categories")
        setMainNavActiveItem("categories");
      if (item?.name?.toLowerCase() === "partners")
        setMainNavActiveItem("partners");
    } else handleMenu();
  }
  if (!mainNavigations?.header?.link?.length)
    return <LineSkeleton length={8} height="10" color="white" />;
  return (
    <div className="relative flex flex-col items-start justify-start gap-8 sm:pt-20 md:items-center">
      <ul className="flex w-full flex-col items-start justify-start gap-4 text-base text-white sm:text-4xl">
        {mainNavigations?.header?.link.map((item) => {
          return (
            <li
              onClick={() => handleClick(item)}
              key={item?.id}
              className={`dash-hover-mini group relative w-full cursor-pointer capitalize`}
            >
              <Link
                className="block cursor-pointer duration-500 group-hover:translate-x-8"
                href={!item?.url ? "#" : item?.url}
              >
                {item?.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="mt-auto hidden flex-wrap items-center gap-4 self-start text-[11px] font-extralight text-white capitalize sm:flex">
        <li className="relative">
          <Link className="underline-hover" href={"#"}>
            Privacy policy
          </Link>
        </li>
        <li className="relative">
          <Link className="underline-hover" href={"#"}>
            Cookies policy
          </Link>
        </li>
        <li className="relative">
          <Link className="underline-hover" href={"#"}>
            Legal terms
          </Link>
        </li>
      </ul>
    </div>
  );
}
