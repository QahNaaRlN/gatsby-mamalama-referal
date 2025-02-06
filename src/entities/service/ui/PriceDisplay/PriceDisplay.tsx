/**
 * Компонент для отображения цены с опциональными единицами измерения и скидкой
 * @module PriceDisplay
 */

import React from "react";

import { CURRENCY } from "@entities/service/model";

/**
 * Интерфейс пропсов компонента PriceDisplay
 * @interface PriceDisplayProps
 * @property {number} price - Исходная цена
 * @property {string} [unit] - Единица измерения (например, "₸/kg")
 * @property {number} [discount] - Размер скидки
 * @property {number} [finalPrice] - Финальная цена после применения скидки
 */
export interface PriceDisplayProps {
  price: number;
  unit?: string;
  discount?: number;
  finalPrice?: number;
}

/**
 * Компонент для отображения цены с возможностью показа скидки
 * @component
 * @param {PriceDisplayProps} props - Пропсы компонента
 * @param {number} props.price - Исходная цена
 * @param {number} [props.finalPrice] - Финальная цена после применения скидки
 * @param {string} [props.unit] - Единица измерения
 * @param {number} [props.discount] - Размер скидки
 * @returns {JSX.Element} Компонент с отображением цены
 */
export const PriceDisplay: React.FC<PriceDisplayProps> = ({
                                                            price,
                                                            finalPrice,
                                                            unit,
                                                            discount
                                                          }: PriceDisplayProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-y-1">
      <span className="text-xl md:text-2xl font-semibold leading-snug text-teal-700">
        {finalPrice} <span className="font-normal">{unit || CURRENCY}</span>
      </span>
      {discount && (
        <div className="flex items-center gap-x-1">
          <span className="text-xs text-neutral-900">
            <span className="font-semibold">{price} ₸</span> - {discount}{" "}
          </span>
          <span
            className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-purple-300 text-xs font-medium text-white">
            {CURRENCY}
          </span>
        </div>
      )}
    </div>
  );
};