import React from "react";

import { useFAQ } from "@entities/faq/hooks/useFAQ";
import { FAQList } from "@widgets/faq/ui";

export const FAQSection: React.FC = () => {
  const { data, loading, error } = useFAQ();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="text-4xl font-medium leading-snug text-neutral-900">
            Частые вопросы
          </h2>
          <FAQList faqs={data} />
        </div>
      </div>
    </section>
  )
};