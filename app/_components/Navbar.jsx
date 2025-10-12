import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useNav } from "../_context/NavProvider";
import MainNav from "./MainNav";
import AnimatedSearch from "./SearchBox";
import SubMenu from "./SubMenu";
import SubMenuItems from "./SubMenuItems";

export default function Navbar({ isHome, isCareer }) {
  const { openNav, navRef, menuLevel, setMenuLevel, handleMenu, scrolled } =
    useNav();

  // stop scroll when nav open
  useEffect(() => {
    if (openNav) {
      // Disable scroll
      document.body.style.overflowY = "hidden";
    } else {
      // Enable scroll
      document.body.style.overflowY = "auto";
    }

    // Cleanup in case component unmounts
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [openNav]);

  return (
    <nav ref={navRef} className="nav flex items-center gap-4 sm:gap-8">
      {/* <button className="group relative z-30 cursor-pointer duration-300 hover:scale-105">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          className="size-7 duration-300 group-hover:rotate-[-360deg] sm:size-8"
        >
          <circle
            cx="19"
            cy="19"
            r="19"
            fill={openNav ? "white" : isHome ? "white" : "#34855B"}
          />
          <path
            d="M26 25L22.25 21.25M23.84 17.42C23.84 20.4134 21.4134 22.84 18.42 22.84C15.4266 22.84 13 20.4134 13 17.42C13 14.4266 15.4266 12 18.42 12C21.4134 12 23.84 14.4266 23.84 17.42Z"
            stroke={openNav ? "#34855B" : isHome ? "#34855B" : "white"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button> */}
      <AnimatedSearch isHome={isHome} />
      <button className="relative z-30 cursor-pointer" onClick={handleMenu}>
        {!openNav ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="14"
            viewBox="0 0 30 14"
            fill="none"
            className="size-6 duration-300 hover:scale-105 sm:size-6"
          >
            <rect
              width="30"
              height="3.75"
              fill={
                openNav
                  ? "white"
                  : isHome
                    ? "white"
                    : scrolled || isCareer
                      ? "#34855B"
                      : "#34855B"
              }
            />
            <rect
              y="9.75"
              width="30"
              height="3.75"
              fill={
                openNav
                  ? "white"
                  : isHome
                    ? "white"
                    : scrolled || isCareer
                      ? "#34855B"
                      : "#34855B"
              }
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-6 -rotate-12 fill-white text-white duration-300 hover:rotate-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>

      {/* navbar */}
      <AnimatePresence mode="wait">
        {/* Desktop */}
        {openNav && (
          <motion.div
            className="bg-primary fixed top-0 right-0 z-20 hidden min-h-screen items-stretch divide-x-1 divide-white px-8 pt-32 pb-8 md:grid"
            key="navbar-desktop"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              width:
                menuLevel === "main"
                  ? "33%"
                  : menuLevel === "submenu"
                    ? "66%"
                    : "100%",
              transition: "width 0.5s ease-in-out",
              gridTemplateColumns:
                menuLevel === "main"
                  ? "1fr"
                  : menuLevel === "submenu"
                    ? "1fr 1fr"
                    : "1fr 1fr 1fr",
            }}
          >
            <MainNav />

            {/* Only show SubMenu when in submenu or deeper */}
            {menuLevel !== "main" && <SubMenu />}

            {/* Only show SubMenuItems when at items level */}
            {menuLevel === "items" && <SubMenuItems />}
          </motion.div>
        )}
        {/* Mobile */}
        {openNav && (
          <motion.div
            className="bg-primary fixed top-0 right-0 z-20 flex min-h-screen w-full flex-col justify-center px-4 py-8 sm:px-8 md:hidden"
            key="navbar-mobile"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {menuLevel !== "main" && (
              <button
                onClick={() =>
                  menuLevel === "submenu"
                    ? setMenuLevel("main")
                    : setMenuLevel("submenu")
                }
                className="mb-4 flex items-center gap-1 text-left text-sm text-white"
              >
                <Image
                  src={"/icons/left-arrow-white.svg"}
                  width={10}
                  height={10}
                  alt="back"
                />{" "}
                <span>Back</span>
              </button>
            )}

            {menuLevel === "main" && <MainNav />}

            {/* Only show SubMenu when in submenu or deeper */}
            {menuLevel === "submenu" && <SubMenu />}

            {/* Only show SubMenuItems when at items level */}
            {menuLevel === "items" && <SubMenuItems />}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
