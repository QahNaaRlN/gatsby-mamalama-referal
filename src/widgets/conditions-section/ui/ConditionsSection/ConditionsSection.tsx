import React from "react";

import { ConditionsCards } from "@features/conditions/ui";

export const ConditionsSection: React.FC = () => {

  return (
    <section className="py-8 md:py-16">
      <div className="container">
        <h2 className="mb-10 text-2xl md:text-4xl text-center md:text-justify font-medium leading-snug text-neutral-900">
          Условия акции
        </h2>
        <ConditionsCards />
        <a
          href="#"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-teal-700 px-6 py-3"
        >
          Полные правила акции
        </a>
      </div>
    </section>
  )
};