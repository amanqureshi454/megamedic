import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import Markdown from "react-markdown";
import { getImageUrl } from "../_lib/helpers";
import { RichTextContentLinkToButton } from "./RichTextContentLinkToButton";

export default function ProductSpecs({
  product,
  active,
  setActive,
  hoveredItem,
  setHoveredItem,
}) {
  const isActive = active === "specs";
  const isHovered = hoveredItem === "company";
  const imageUrl = getImageUrl(product?.specs?.image);

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
      onMouseEnter={() => setHoveredItem("specs")}
      onMouseLeave={() => setHoveredItem("")}
    >
      {product?.specs && (
        <div className={`space-y-12 px-8 py-10 sm:px-14 sm:py-20`}>
          <h2
            onClick={() => {
              setActive("specs");
            }}
            className="cursor-pointer text-4xl sm:text-6xl"
          >
            {product?.specs?.title}
          </h2>

          {/* <AnimatePresence mode="wait"> */}
          {active === "specs" && (
            <div
              className={
                "markdown-content grid grid-cols-1 items-start gap-x-14 gap-y-10 pb-32 text-[15px] font-medium text-balance sm:text-lg lg:grid-cols-[1fr_0.6fr]"
              }
            >
              {/* <div className="prose prose-ul:flex prose-ul:flex-col prose-p:m-0 prose-a:text-inherit flex max-w-none flex-col gap-4 text-inherit">
                <Markdown>{product?.specs?.content}</Markdown>
              </div> */}
              <div className="prose prose-ul:flex prose-ul:flex-col prose-p:m-0 prose-a:text-inherit prose-li:text-wrap flex max-w-none flex-col gap-0 text-inherit">
                <Markdown
                  components={{
                    a: ({ node, ...props }) => (
                      <RichTextContentLinkToButton
                        {...props}
                        buttonText={"Full Specs"}
                      />
                    ),
                  }}
                >
                  {product?.specs?.content}
                </Markdown>
              </div>

              <div className="relative -order-1 flex h-[514px] w-[410px] max-w-full items-center justify-end justify-self-center overflow-hidden rounded-2xl bg-[#C4C4C4] shadow-2xl lg:order-1 lg:justify-self-end">
                <Image
                  width={500}
                  height={500}
                  src={imageUrl}
                  alt="image"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          )}
          {/* </AnimatePresence> */}
        </div>
      )}
    </div>
  );
}
