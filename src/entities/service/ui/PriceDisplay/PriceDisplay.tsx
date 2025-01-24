import React from "react";

import { CURRENCY } from "@entities/service/model";

/**
 * Interface for the properties of the PriceDisplay component.
 * @interface
 */
export interface PriceDisplayProps {
  /**
   * The price to be displayed.
   * @type {number}
   */
  price: number;

  /**
   * The unit of measurement (e.g., "₸/kg").
   * @type {string}
   * @optional
   */
  unit?: string;

  /**
   * The discount percentage.
   * @type {number}
   * @optional
   */
  discount?: number;

  /**
   * The final price.
   * @type {number}
   * @optional
   */
  finalPrice?: number;
}

/**
 * A React component for displaying a price with optional unit and discount.
 * @param {PriceDisplayProps} props - The properties for the component.
 * @returns {JSX.Element} The rendered component.
 */
export const PriceDisplay: React.FC<PriceDisplayProps> = ({
                                                            price,
                                                            finalPrice,
                                                            unit,
                                                            discount
                                                          }: PriceDisplayProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-y-1">
      <span className="text-2xl font-semibold leading-snug text-teal-700">
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