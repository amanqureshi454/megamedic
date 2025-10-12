import Image from "next/image";
import React from "react";

const valueCards = [
  {
    id: "Partnership, Not Transactions",
    name: "Partnership, Not Transactions",
    desc: "We go beyond delivering products; we create lasting value through collaboration and trust.",
    icon: "/icons/partnership.svg",
  },
  {
    id: "Technology as an Enabler",
    name: "Technology as an Enabler",
    desc: "Digitalization helps us work smarter, faster, and more transparently, benefiting everyone involved.",
    icon: "/icons/technology.svg",
  },
  {
    id: "Local Immersion Matters",
    name: "Local Immersion Matters",
    desc: "Understanding Switzerland’s regions, cultures, and languages ensures personalized and effective healthcare solutions.",
    icon: "/icons/location.svg",
  },
  {
    id: "Patient-Centric Distribution",
    name: "Patient-Centric Distribution",
    desc: "We innovate supply chains to prioritize seamless delivery and better patient outcomes.",
    icon: "/icons/patient.svg",
  },
];
export default function () {
  return (
    <div className="mx-auto w-[85%] space-y-14 py-10">
      <h2 className="text-primary text-3xl font-medium">Our values</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {valueCards.map((card) => {
          return (
            <div
              key={card.id}
              className="bg-primary group flex h-[400px] flex-col justify-center gap-5 rounded-xl px-4 text-white transition-all duration-700 hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-2xl">{card.name}</h2>
              <p className="text-sm">{card.desc}</p>
              <Image
                src={card.icon}
                alt={card.name}
                width={200}
                height={200}
                className="block size-[140px] self-center object-contain duration-[1200ms] ease-in-out group-hover:rotate-[-360deg]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
