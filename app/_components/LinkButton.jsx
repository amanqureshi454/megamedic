"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "../_utils/cn";

export default function LinkButton({
  href = "#",
  children,
  className,
  hoverColor = "#FFAB8F",
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        `bg-primary group relative w-fit overflow-hidden rounded-full px-4 py-2 text-base font-medium text-white capitalize transition-all duration-300 active:translate-y-1 sm:text-xl`,
        className,
      )}
      href={href}
    >
      <AnimatePresence mode="wait">
        {hovered && (
          <motion.span
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-0"
            style={{ backgroundColor: `${hoverColor}` }}
          />
        )}
      </AnimatePresence>

      {children}
    </Link>
  );
}
