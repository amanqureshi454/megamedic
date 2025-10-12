"use client";
import React, { useRef, useState, useTransition } from "react";
import FormRow from "./FormRow";
import Link from "next/link";
import { contactData } from "../_lib/action";
import FormErrorMessage from "./FormErrorMessage";
import FormSuccessMessage from "./FormSuccessMessage";
import Markdown from "react-markdown";
import { useSplitTitleAnimation } from "../_gsap/useSplitTitleAnimation";
import { useSplitLinesAnimation } from "../_gsap/useSplitLineAnimation";

export default function ContactForm({ data }) {
  const formRef = useRef();
  const [errorMessage, setErrorMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData) {
    startTransition(async () => {
      const res = await contactData(formData);
      if (res?.errors) {
        setSuccessMessage(null);
        setErrorMessage(res?.errors?.map((error) => error?.message));
      } else {
        setErrorMessage(null);
        setSuccessMessage("Congratulation! Form submitted.");
        if (formRef.current) {
          formRef.current.reset();
        }
        // 🕒 Set it back to null after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    });
  }

  useSplitTitleAnimation({
    trigger: "#contact-section",
    titleSelector: "#contact-section .title",
    start: "top 80%",
    end: "bottom 20%",
    direction: "left",
    duration: 1.8,
    stagger: 0.05,
  });
  useSplitLinesAnimation({
    trigger: "#contact-section",
    descriptionSelector: "#contact-section .description",
    start: "top 40%",
    duration: 1.8,
    delay: 0.5,
    stagger: 0.05,
  });
  return (
    <div className="bg-gray-background space-y-3 rounded-2xl px-6 py-12 sm:space-y-6">
      <h1 className="title text-2xl sm:text-5xl">{data?.title}</h1>
      <div className="description text-xs sm:text-xl">
        <Markdown>{data?.description}</Markdown>
      </div>
      <FormErrorMessage errorMessage={errorMessage} />
      <FormSuccessMessage successMessage={successMessage} />
      <form
        // action={(formData) => handleSubmit(formData)}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
        className="!mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:!mt-12 sm:gap-y-6"
        ref={formRef}
      >
        <FormRow label="First name">
          <input
            id="firstName"
            type="text"
            name="firstName"
            autoComplete="name"
            placeholder="First Name"
            className="min-h-6 rounded-md border border-[#D9D9D9] bg-white px-4 placeholder:text-[11px] placeholder:text-[#A4ADB3] focus:border-[#D9D9D9] focus:outline-none sm:h-12 sm:rounded-2xl sm:placeholder:text-lg"
          />
        </FormRow>
        <FormRow label="Last name">
          <input
            id="lastName"
            type="text"
            name="lastName"
            autoComplete="name"
            placeholder="Last Name"
            className="min-h-6 rounded-md border border-[#D9D9D9] bg-white px-4 placeholder:text-[11px] placeholder:text-[#A4ADB3] focus:border-[#D9D9D9] focus:outline-none sm:h-12 sm:rounded-2xl sm:placeholder:text-lg"
          />
        </FormRow>
        <FormRow label="Email" extendCols={2}>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            className="min-h-6 rounded-md border border-[#D9D9D9] bg-white px-4 placeholder:text-[11px] placeholder:text-[#A4ADB3] focus:border-[#D9D9D9] focus:outline-none sm:h-12 sm:rounded-2xl sm:placeholder:text-lg"
          />
        </FormRow>
        <FormRow label="Company" extendCols={2}>
          <input
            id="company"
            type="text"
            name="company"
            placeholder="Company"
            className="min-h-6 rounded-md border border-[#D9D9D9] bg-white px-4 placeholder:text-[11px] placeholder:text-[#A4ADB3] focus:border-[#D9D9D9] focus:outline-none sm:h-12 sm:rounded-2xl sm:placeholder:text-lg"
          />
        </FormRow>
        <FormRow label="Phone number" extendCols={2}>
          <input
            id="phoneNumber"
            type="tel"
            name="phone"
            placeholder="+ 41 000 000 0000 "
            className="min-h-6 rounded-md border border-[#D9D9D9] bg-white px-4 placeholder:text-[11px] placeholder:text-[#A4ADB3] focus:border-[#D9D9D9] focus:outline-none sm:h-12 sm:rounded-2xl sm:placeholder:text-lg"
          />
        </FormRow>
        <FormRow label="Interested in" extendCols={2}>
          <input
            id="InterestedIn"
            type="text"
            name="InterestedIn"
            placeholder="Product name"
            className="min-h-6 rounded-md border border-[#D9D9D9] bg-white px-4 placeholder:text-[11px] placeholder:text-[#A4ADB3] focus:border-[#D9D9D9] focus:outline-none sm:h-12 sm:rounded-2xl sm:placeholder:text-lg"
          />
        </FormRow>
        <FormRow label="Message" extendCols={2}>
          <textarea
            placeholder="Leave us a message"
            className="min-h-20 rounded-md border border-[#D9D9D9] bg-white px-4 pt-2 placeholder:text-[11px] placeholder:text-[#A4ADB3] focus:border-[#D9D9D9] focus:outline-none sm:min-h-32 sm:rounded-2xl sm:placeholder:text-lg"
            name="message"
            id="message"
          ></textarea>
        </FormRow>
        <div className="[grid-column:1/-1] flex items-center gap-2">
          <input
            name="isAgreeWithPrivacyPolicy"
            className="border-gray-secondary accent-primary checked:border-primary checked:bg-primary h-[1.1rem] w-[1.1rem] cursor-pointer appearance-none rounded-xs border bg-white transition duration-150"
            type="checkbox"
          />
          <label className="text-[10px] sm:text-base">
            You agree to our friendly{" "}
            <Link href={"#"} className="underline">
              privacy policy
            </Link>
          </label>
        </div>
        <button
          disabled={isPending}
          className="bg-primary [grid-column:1/-1] block w-fit cursor-pointer rounded-full px-4 py-2 text-xs text-white capitalize duration-300 hover:scale-95 sm:h-12 sm:text-xl"
        >
          {isPending ? "sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}
