import React from "react";

import { PriceDisplay } from "@entities/service/ui/PriceDisplay";

/**
 * Интерфейс пропсов компонента PriceListItem
 * @interface PriceListItemProps
 * @property {string} title - Название услуги
 * @property {number} price - Цена без скидки
 * @property {number} [discount] - Размер скидки
 * @property {number} finalPrice - Итоговая цена
 */
export interface PriceListItemProps {
  title: string;
  price: number;
  discount?: number;
  finalPrice: number;
}

/**
 * Компонент для отображения элемента прайс-листа
 * @component
 * @param {PriceListItemProps} props - Пропсы компонента
 * @param {string} props.title - Название услуги
 * @param {number} props.price - Исходная цена
 * @param {number} [props.discount] - Размер скидки
 * @param {number} props.finalPrice - Итоговая цена
 * @returns {JSX.Element} Элемент прайс-листа с названием и ценой
 */
export const PriceListItem: React.FC<PriceListItemProps> = ({
                                                              title,
                                                              price,
                                                              discount,
                                                              finalPrice,
                                                            }: PriceListItemProps): JSX.Element => {
  return (
    <div className="flex items-start justify-between border-b border-teal-700 pb-3.5">
      <span className="basis-44 lg:basis-56 text-base md:text-lg font-normal leading-relaxed tracking-tight text-neutral-900">
        {title}
      </span>
      <PriceDisplay price={price} discount={discount} finalPrice={finalPrice} />
    </div>
  );
};