import Link from "next/link";
import ReactMarkdown from "react-markdown";
import LinkButton from "./LinkButton";
export default function ProductFeatures({ product }) {
  return (
    <div className="space-y-6">
      <div className="prose xs:prose-h2:text-2xl prose-h2:text-base max-w-none">
        <ReactMarkdown>{product?.description}</ReactMarkdown>
      </div>

      <LinkButton
        className="bg-primary group flex w-fit items-center gap-4 rounded-full px-4 py-2 font-medium text-white"
        href={product?.cta?.url}
      >
        <span className="relative z-20">{product?.cta?.name}</span>
        <span className="relative z-20 inline-block">
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-300 group-hover:rotate-45"
          >
            <path
              d="M1 1.5H12M12 1.5V12.5M12 1.5L1 12.5"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </span>
      </LinkButton>
    </div>
  );
}
