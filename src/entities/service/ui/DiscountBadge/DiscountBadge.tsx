/**
 * @fileoverview Компонент для отображения значка скидки
 */

import React from "react";

/**
 * Интерфейс пропсов компонента DiscountBadge
 *
 * @interface DiscountBadgeProps
 * @property {number} percentageDiscount - Размер скидки в процентах
 */
interface DiscountBadgeProps {
  percentageDiscount: number;
}

/**
 * Компонент для отображения значка скидки
 *
 * @component
 * @description
 * Отображает красный значок с процентом скидки в правом нижнем углу
 *
 * @param {DiscountBadgeProps} props - Пропсы компонента
 * @param {number} props.percentageDiscount - Размер скидки в процентах
 *
 * @example
 * <DiscountBadge percentageDiscount={15} />
 */
export const DiscountBadge: React.FC<DiscountBadgeProps> = ({ percentageDiscount }: DiscountBadgeProps) => {
  return (
    <span
      className="absolute -right-2 bottom-0 inline-flex h-6 origin-top-left rotate-[-4.18deg] items-center justify-center gap-2.5 rounded-md bg-red-500 px-1.5 py-1">
      <span className="text-base font-medium tracking-tight text-neutral-50">
        -{percentageDiscount}%
      </span>
    </span>
  )
}