import React from "react";

interface DiscountBadgeProps {
  percentageDiscount: number; // Размер скидки в процентах
}

/**
 * Компонент для отображения скидки
 * @param {DiscountBadgeProps} props - Пропсы компонента
 * @returns Элемент с отображением скидки
 */
export const DiscountBadge: React.FC<DiscountBadgeProps> = ({ percentageDiscount }: DiscountBadgeProps) => {
  return (
    <span
      className="absolute -right-2 bottom-0 inline-flex h-6 origin-top-left rotate-[-4.18deg] items-center justify-center gap-2.5 rounded-md bg-red-500 px-1.5 py-1">
    <span className="text-base font-medium tracking-tight text-neutral-50">
      -{percentageDiscount}%
    </span>
  </span>
  )}