/**
 * @fileoverview Обновленные компоненты карточек сервисов для работы с плоской структурой данных
 */

import React from "react";


import { CURRENCY } from '@entities/service/model/consts'
import { type StandardCardProps } from '@entities/service/model/types'
import { DiscountBadge } from '@entities/service/ui/DiscountBadge'
import { PriceDisplay } from '@entities/service/ui/PriceDisplay'
import { MemoizedRichTextRenderer } from "@lib/renderRichText/renderRichText";
import { getStrapiUrl } from "@lib/strapi/media";
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

  StandardCard.whyDidYouRender = true;

  return (
    <div className="inline-flex flex-col items-start justify-start md:gap-5 rounded-3xl bg-white px-6 pb-8 pt-7 shadow-custom">
      <div className="relative mb-5 md:mb-0">
        <Icon
          src={ imageUrl }
          alt={ picture.alternativeText }
          className={ pictureClassnames }
          width={picture.width}
          height={picture.height}
        />
        {percentageDiscount && <DiscountBadge percentageDiscount={percentageDiscount} />}
      </div>

      <h3 className="text-xl font-semibold leading-relaxed text-teal-700 mb-1 md:mb-0">
        {title}
      </h3>

      <span className="text-base font-normal leading-snug text-neutral-900 mb-3 md:mb-3">
        <MemoizedRichTextRenderer content={description} />
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