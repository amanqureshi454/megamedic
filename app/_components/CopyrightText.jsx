"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function CopyrightText() {
  return (
    <div className="relative z-10 mx-auto mt-8 grid w-[85%] grid-cols-1 justify-between gap-3 text-xs sm:mt-auto sm:grid-cols-2 sm:gap-0">
      <p className="mt-8 sm:mt-0">@ 2025 Nexamedic</p>
      <ul className="-order-1 flex w-full flex-wrap items-center justify-between gap-2 sm:order-1">
        <li className="relative">
          <Link className="underline-hover" href={"#"}>
            LinkdIn
          </Link>
        </li>
        <li className="relative">
          <Link className="underline-hover" href={"#"}>
            Vimeo
          </Link>
        </li>
        <li className="relative">
          <Link className="underline-hover" href={"#"}>
            Privacy policy
          </Link>
        </li>
        <li className="relative">
          <Link className="underline-hover" href={"#"}>
            General terms
          </Link>
        </li>
        <li className="relative">
          <Link className="underline-hover" href={"#"}>
            Impressum
          </Link>
        </li>
      </ul>
    </div>
  );
}
