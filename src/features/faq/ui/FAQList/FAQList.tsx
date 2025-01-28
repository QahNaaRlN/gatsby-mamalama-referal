import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

import { useFAQ } from "@entities/faq";
import { selectAllFAQs } from "@features/faq/lib";
import { FAQListProps } from "@features/faq/model";
import { ErrorMessage } from "@ui/error";
import { Spinner } from "@ui/spinner";

export const FAQList: React.FC<FAQListProps> = () => {

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const { data, error, loading } = useFAQ();
  const allFAQs = selectAllFAQs(data);
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Произошла ошибка при загрузке сервисов. Пожалуйста, попробуйте позже."
      />
    );
  }

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