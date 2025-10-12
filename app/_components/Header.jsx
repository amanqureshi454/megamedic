"use client";
import { usePathname } from "next/navigation";
import { useNav } from "../_context/NavProvider";
import Logo from "./Logo";
import Navbar from "./Navbar";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCareer = pathname === "/career";
  const { scrolled } = useNav();

  return (
    <header
      className="sticky top-0 !z-[9999999] flex min-h-24 items-center justify-center px-2 sm:px-4"
      style={{
        backdropFilter: scrolled ? "blur(40px)" : "blur(0)",
        background: scrolled ? "rgba(255,255,255,0.1)" : " transparent",
      }}
    >
      <div className="mx-auto flex w-[90%] items-center justify-between">
        <Logo isHome={isHome} />

        <Navbar isHome={isHome} isCareer={isCareer} />
      </div>
    </header>
  );
}
