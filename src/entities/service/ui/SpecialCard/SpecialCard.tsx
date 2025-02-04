import React from "react";

import { SpecialCardProps } from "@entities/service/model";
import { PriceListItem } from "@entities/service/ui/PriceListItem";
import { getStrapiUrl } from "@lib/strapi/media";
import { Icon } from "@ui/icon";

/**
 * Компонент специальной карточки сервиса с прайс-листом
 */
export const SpecialCard: React.FC<SpecialCardProps> = ({ service }) => {
  const {
    title,
    picture,
    priceList,
    duration,
    pictureClassnames
  } = service

  const imageUrl = picture?.url ? getStrapiUrl(picture.url) : '/default-service-icon.svg';

  return (
    <div className="relative inline-flex flex-col items-start justify-start gap-5 rounded-3xl bg-white px-6 pb-8 pt-9 shadow-custom lg:row-span-2">
      <div className="flex items-center gap-x-2">
        <h3 className="text-lg md:text-2xl font-semibold leading-tight text-teal-700">
          {title}
        </h3>
        {duration && (
          <span className="text-base font-normal leading-snug text-neutral-700">
            • {duration} дня
          </span>
        )}
      </div>

      {priceList.map((item, index) => (
        <PriceListItem
          key={`${item.title}-${index}`}
          {...item}
        />
      ))}

      <Icon
        src={ imageUrl }
        alt={ picture.alternativeText }
        className={ pictureClassnames }
        width={picture.width}
        height={picture.height}
      />
    </div>
  )
}