import Link from "next/link";

export const RichTextContentLinkToButton = ({ href, buttonText }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="button-hover mt-8 block w-fit rounded-full border border-[#DDAA97] px-8 py-2 text-base font-medium capitalize no-underline transition duration-300 hover:text-white hover:shadow-2xl sm:text-xl"
    >
      <span className="relative z-20">{buttonText}</span>
    </Link>
  );
};
