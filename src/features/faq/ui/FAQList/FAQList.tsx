import { ChevronDown } from "lucide-react";
import React, { useState, useCallback, useMemo } from "react";

import { cn } from "@/shared/lib/utils";
import { useFAQ } from "@entities/faq";
import { selectAllFAQs } from "@features/faq/lib";
import { FAQListProps } from "@features/faq/model";
import { ErrorMessage } from "@ui/error";
import { Spinner } from "@ui/spinner";

export const FAQList: React.FC<FAQListProps> = React.memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { data, error, loading } = useFAQ();
  const allFAQs = useMemo(() => (data ? selectAllFAQs(data) : []), [data]);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const renderFAQItem = useCallback(
    (faq: any, index: number) => (
      <div key={faq.id || index} className="border-b border-slate-200 py-3 md:py-6">
        <button
          className="flex w-full items-center justify-between gap-x-2 text-teal-700"
          onClick={() => handleToggle(index)}
          aria-expanded={openIndex === index}
        >
          <span className="text-base md:text-xl font-semibold leading-relaxed text-start md:text-center">
            {faq.question}
          </span>
          <ChevronDown
            className={cn(
              "shrink-0 transform stroke-neutral-700 transition-transform duration-200",
              openIndex === index && "rotate-180",
            )}
          />
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-200",
            openIndex === index ? "max-h-96 py-4" : "max-h-0",
          )}
        >
          <div className="text-base font-normal leading-snug text-neutral-700">
            {faq.answer}
          </div>
        </div>
      </div>
    ),
    [handleToggle, openIndex],
  );

  if (loading) return <Spinner />;
  if (error) {
    return (
      <ErrorMessage message="Произошла ошибка при загрузке сервисов. Пожалуйста, попробуйте позже." />
    );
  }

  return <div className="w-full max-w-3xl">{allFAQs.map(renderFAQItem)}</div>;
});

FAQList.whyDidYouRender = true;
FAQList.displayName = "FAQList";
