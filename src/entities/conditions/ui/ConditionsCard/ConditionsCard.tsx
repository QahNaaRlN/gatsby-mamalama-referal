import React from "react";

import { ConditionsCardProps } from "@entities/conditions/model/types";
import { MemoizedRichTextRenderer } from "@lib/renderRichText/renderRichText";

/**
 * Компонент карточки условий акции
 */
export const ConditionsCard: React.FC<ConditionsCardProps> = React.memo(({ conditions }) => {

  const {
    title,
    description
  } = conditions;

  return (
    <div
      className="inline-flex basis-1/3 flex-col items-start justify-start gap-4 rounded-3xl bg-white px-6 pb-8 pt-7 shadow-custom">
      <h4 className="text-base font-semibold leading-snug text-teal-700">
        {title}
      </h4>
      <div className="text-base font-normal leading-snug text-neutral-900"
      ><MemoizedRichTextRenderer content={description} /></div>
    </div>
  );
});

ConditionsCard.displayName = 'ConditionsCard';