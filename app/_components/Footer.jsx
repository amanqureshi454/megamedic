"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CopyrightText from "./CopyrightText";
import FooterAddressCol from "./FooterAddressCol";
import FooterLinks from "./FooterLinks";

export default function Footer() {
  const pathname = usePathname();
  const isCareerPage = pathname === "/career";
  return (
    <footer
      className={`xs:pt-40 relative flex min-h-[500px] flex-col items-center justify-center gap-6 object-cover pt-20 pb-4 text-[#1C3141] ${!isCareerPage && "xs:!mt-32 mt-16 md:!mt-50"}`}
    >
      {!isCareerPage ? (
        <Image
          src={"/Ellipse 2.png"}
          className="xs:-top-[30%] xs:h-[200px] absolute -top-[20%] left-0 z-10 block h-[150px] w-full translate-y-1/2 md:-top-[40%]"
          width={100}
          height={100}
          alt="design"
        />
      ) : (
        <Image
          src={"/footer-ellipse.png"}
          className="xs:-top-[30%] xs:h-[230px] absolute -top-[20%] left-0 z-10 block h-[150px] w-full translate-y-1/2 md:-top-[40%]"
          width={100}
          height={100}
          alt="design"
        />
      )}

      <Image
        src={"/footer-ellipse.png"}
        className="xs:-top-[20%] xs:h-[230px] xs:blur-2xl absolute -top-[15%] left-0 z-10 block h-[150px] w-full translate-y-1/2 blur-lg md:-top-[30%]"
        width={100}
        height={100}
        alt="design"
      />

      <Image fill src={"/footer-bg.png"} alt="footer" />

      <div className="relative z-10 mx-auto grid w-[85%] grid-cols-2 gap-6 pt-20">
        <FooterLinks />
        <FooterAddressCol />
      </div>
      <CopyrightText />
    </footer>
  );
}
