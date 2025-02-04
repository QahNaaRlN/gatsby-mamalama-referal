import React, { forwardRef, InputHTMLAttributes } from "react";
import InputMask from "react-input-mask";
import { twMerge } from "tailwind-merge";

/**
 * @typedef {Object} InputProps
 * @extends {Omit<InputHTMLAttributes<HTMLInputElement>, "size">}
 * @property {string} [mask] - Маска для форматирования вводимых данных. Например: "+7 (999) 999-99-99" для телефона
 */

/**
 * Компонент Input представляет собой обертку над стандартным HTML-элементом input с поддержкой масок ввода.
 *
 * @component
 * @example
 * // Базовое использование
 * <Input placeholder="Введите текст" />
 *
 * @example
 * // Использование с маской для телефона
 * <Input
 *   mask="+7 (999) 999-99-99"
 *   placeholder="Введите номер телефона"
 *   onChange={(e) => console.log(e.target.value)}
 * />
 *
 * @example
 * // Использование с пользовательскими стилями
 * <Input
 *   className="custom-input-class"
 *   disabled={false}
 *   placeholder="Пользовательские стили"
 * />
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Маска для input. Используется для форматирования вводимых данных.
   * Поддерживает следующие символы:
   * - 9: цифра от 0 до 9
   * - a: буква (A-Z, a-z)
   * - *: буква или цифра
   *
   * @example "+7 (999) 999-99-99" // маска для номера телефона
   * @example "99.99.9999" // маска для даты
   */
  mask?: string;
  error?: string;
}

/**
 * Компонент Input с поддержкой ref.
 *
 * @param {InputProps} props - Свойства компонента
 * @param {React.Ref<HTMLInputElement>} ref - Реф для доступа к DOM-элементу input
 * @returns {React.ReactElement} React элемент
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(({
                                                                 className,
                                                                 mask,
                                                                 disabled,
                                                                 error,
                                                                 ...props
                                                               }, ref) => {
  /**
   * Базовые стили компонента с использованием Tailwind CSS
   */
  const inputStyles = twMerge(
    "w-full py-3 bg-white rounded-xl shadow-custom border justify-start items-start gap-2 inline-flex px-3 hover:border-teal-700 focus:border-teal-700 focus-visible:border-teal-700 active:border-teal-700 focus-visible:outline-none",
    error ? "border-red-500" : "border-slate-300",
    className
  );

  if (mask) {
    return (
      <InputMask
        mask={mask}
        maskChar="_"
        disabled={disabled}
        {...props}
      >
        {(inputProps: any) => (
          <input
            {...inputProps}
            ref={ref}
            className={inputStyles}
          />
        )}
      </InputMask>
    );
  }

  return (
    <input
      ref={ref}
      disabled={disabled}
      className={inputStyles}
      {...props}
    />
  );
});

Input.displayName = "Input";