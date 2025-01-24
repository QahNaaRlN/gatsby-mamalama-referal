import { ChevronDown } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "react";

import { FAQ } from "@entities/faq/model/types";
import { selectAllFAQs } from "@features/faq/lib";

export interface FAQListProps {
  faqs: FAQ[];
}

export const FAQList = ({ faqs }: FAQListProps) => {
  const allFAQs = selectAllFAQs(faqs);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl">
      {allFAQs.map((faq, index) => (
        <div key={index} className="border-b border-slate-200 py-6">
          <button
            className="flex w-full items-center justify-between text-teal-700"
            onClick={() => handleToggle(index)}
            aria-expanded={openIndex === index}
          >
            <span className="text-xl font-semibold leading-relaxed">
              {faq.question}
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
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};