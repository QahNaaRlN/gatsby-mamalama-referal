import React from "react";

import { ServiceCards } from "@features/service/ui/ServiceCards";

export const ServiceSection: React.FC = () => {

  return (
    <section className="py-8 md:py-16">
      <div className="container">
        <h2 className="mb-10 text-2xl md:text-4xl font-medium leading-snug text-neutral-900">
          На что можно потратить 3000 тенге
        </h2>
        <ServiceCards />
      </div>
    </section>
  )
};