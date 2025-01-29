/**
 * @fileoverview Обновленные компоненты карточек сервисов для работы с плоской структурой данных
 */

import React from "react";


import { CURRENCY } from '@entities/service/model/consts'
import { type StandardCardProps } from '@entities/service/model/types'
import { DiscountBadge } from '@entities/service/ui/DiscountBadge'
import { PriceDisplay } from '@entities/service/ui/PriceDisplay'
import { renderRichText } from "@lib/renderRichText/renderRichText";
import { getStrapiUrl } from "@lib/strapi/media";
import { useRenderCount } from "@shared/hooks/useRenderCount";
import { Icon } from '@ui/icon'


/**
 * Компонент стандартной карточки сервиса
 */
export const StandardCard: React.FC<StandardCardProps> = ({ service }) => {

  const {
    title,
    description,
    price,
    discount,
    finalPrice,
    unit,
    percentageDiscount,
    picture,
    pictureClassnames
  } = service

  const imageUrl = picture?.url ? getStrapiUrl(picture.url) : '/default-service-icon.svg';

  const renderCount = useRenderCount({ service }, {
    name: 'StandardCard',
    logProps: true
  });

  // Если количество рендеров превышает разумный порог
  if (renderCount > 10) {
    console.warn(`[Warning] SomeComponent rendered more than 10 times`);
  }

  return (
    <div className="inline-flex flex-col items-start justify-start gap-5 rounded-3xl bg-white px-6 pb-8 pt-7 shadow-custom">
      <div className="relative">
        <Icon
          src={ imageUrl }
          alt={ picture.alternativeText }
          className={ pictureClassnames }
          width={picture.width}
          height={picture.height}
        />
        {percentageDiscount && <DiscountBadge percentageDiscount={percentageDiscount} />}
      </div>

      <h3 className="text-xl font-semibold leading-relaxed text-teal-700">
        {title}
      </h3>

      <span className="text-base font-normal leading-snug text-neutral-900">
        {renderRichText(description)}
      </span>

      <PriceDisplay
        finalPrice={finalPrice}
        unit={unit || CURRENCY}
        discount={discount}
        price={price}
      />
    </div>
  )
}