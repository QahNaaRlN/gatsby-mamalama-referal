import React, { useState } from "react";

import { ChevronDown } from "lucide-react";

import type { FAQAccordionProps } from "../model/types";

export const FaqAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl">
      {items.map((item, index) => (
        <div key={index} className="border-b border-slate-200 py-6">
          <button
            className="flex w-full items-center justify-between text-teal-700"
            onClick={() => handleToggle(index)}
            aria-expanded={openIndex === index}
          >
            <span className="text-xl font-semibold leading-relaxed">
              {item.title}
            </span>
            <ChevronDown
              className={`transform stroke-neutral-700 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === index ? "max-h-96 py-4" : "max-h-0"
            }`}
          >
            <div className="text-base font-normal leading-snug text-neutral-700">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
