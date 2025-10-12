import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import Markdown from "react-markdown";
import { getImageUrl } from "../_lib/helpers";
import { RichTextContentLinkToButton } from "./RichTextContentLinkToButton";

export default function ProductCompany({
  product,
  active,
  setActive,
  hoveredItem,
  setHoveredItem,
}) {
  const isActive = active === "company";
  const isHovered = hoveredItem === "specs";
  const imageUrl = getImageUrl(product?.company?.imageSection?.image);
  const secondImageUrl = getImageUrl(
    product?.company?.secondImageSection?.image,
  );
  const finalImageUrl = imageUrl.startsWith("/default.png") ? false : imageUrl;
  const finalSecondImageUrl = secondImageUrl.startsWith("/default.png")
    ? false
    : secondImageUrl;
  const containerRef = useRef(null);

  useGSAP(() => {
    if (isActive && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, height: 0, yPercent: 100 },
        {
          opacity: 1,
          yPercent: 0,
          height: "auto",
          duration: 2,
          ease: "sine.out",
        },
      );
    }
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className={clsx(
        "rounded-4xl transition-colors duration-300",
        isActive
          ? "bg-primary order-1 text-white"
          : "bg-gray-background hover:bg-primary -order-1 transition-all duration-1000 hover:text-white",
        isHovered && "!bg-gray-background !text-blackish",
      )}
      onMouseEnter={() => setHoveredItem("company")}
      onMouseLeave={() => setHoveredItem("")}
    >
      {product?.company && (
        <div className={`space-y-12 px-8 py-10 sm:px-14 sm:py-20`}>
          <h2
            onClick={() => {
              setActive("company");
            }}
            className="cursor-pointer text-4xl sm:text-6xl"
          >
            {product?.company?.title}
          </h2>
          {/* <AnimatePresence mode="wait"> */}
          {active === "company" && (
            <div
              className={`grid grid-cols-1 items-start gap-10 sm:gap-20 lg:grid-cols-2`}
            >
              {/* image content */}
              <div className="space-y-6">
                <h2 className="text-xl sm:text-3xl">
                  {product?.company?.imageSection?.title}
                </h2>
                {/* <p className="text-xs sm:text-xl">
                  {product?.company?.imageSection?.description}
                </p> */}
                <div className="flex flex-col gap-4 text-xs text-inherit sm:text-xl">
                  <Markdown
                    components={{
                      a: ({ node, ...props }) => (
                        <RichTextContentLinkToButton
                          {...props}
                          buttonText={"Partner Website"}
                        />
                      ),
                    }}
                  >
                    {product?.company?.imageSection?.description}
                  </Markdown>
                </div>
              </div>

              {/* image */}
              <div className="relative flex justify-center">
                {!finalImageUrl && (
                  <div className="bg-gray-secondary h-[200px] rounded-2xl"></div>
                )}
                {finalImageUrl && (
                  <Image
                    className="w-[450px]"
                    width={500}
                    height={500}
                    alt={
                      product?.company?.imageSection?.image?.text ||
                      "Company Image"
                    }
                    src={finalImageUrl}
                  />
                )}
              </div>
            </div>
          )}
          {/* </AnimatePresence> */}
        </div>
      )}
    </div>
  );
}
