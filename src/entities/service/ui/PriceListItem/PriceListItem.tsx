import React from "react";

import { PriceDisplay } from "@entities/service/ui/PriceDisplay";

/**
 * Пропсы компонента PriceListItem
 */
export interface PriceListItemProps {
  title: string; // Название услуги
  price: number; // Цена без скидки
  discount?: number; // Размер скидки (опционально)
  finalPrice: number; // Итоговая цена
}

/**
 * Компонент элемента прайс-листа
 * @param {PriceListItemProps} props - Пропсы компонента
 * @returns Элемент прайс-листа
 */
export const PriceListItem: React.FC<PriceListItemProps> = ({
                                                              title,
                                                              price,
                                                              discount,
                                                              finalPrice,
                                                            }: PriceListItemProps) => {
  return (
    <div className="flex items-start justify-between border-b border-teal-700 pb-3.5">
    <span className="basis-56 text-lg font-normal leading-relaxed tracking-tight text-neutral-900">
      {title}
    </span>
      <PriceDisplay price={price} discount={discount} finalPrice={finalPrice} />
    </div>
  );
}