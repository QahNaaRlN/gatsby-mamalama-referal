import React from "react";

import { FAQList } from "@features/faq/ui";

export const FAQSection: React.FC = () => {

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex justify-between">
          <h2 className="text-4xl font-medium leading-snug text-neutral-900">
            Частые вопросы
          </h2>
          <FAQList />
        </div>
      </div>
    </section>
  )
};