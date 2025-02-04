import React from "react";

import { FAQList } from "@features/faq/ui";

export const FAQSection: React.FC = () => {

  return (
    <section className="pt-8 pb-16 md:py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between">
          <h2 className="text-2xl md:text-4xl font-medium leading-snug text-neutral-900">
            Частые вопросы
          </h2>
          <FAQList />
        </div>
      </div>
    </section>
  )
};