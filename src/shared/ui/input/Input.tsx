import { LucideIcon } from 'lucide-react';
import { forwardRef , InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Размер инпута
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Иконка слева
   */
  leftIcon?: LucideIcon;
  /**
   * Иконка справа
   */
  rightIcon?: LucideIcon;
  /**
   * Состояние ошибки
   */
  error?: string;
  /**
   * Текст подсказки под инпутом
   */
  helperText?: string;
  /**
   * Лейбл над инпутом
   */
  label?: string;
  /**
   * Растягивать ли инпут на всю ширину контейнера
   */
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
                                                                 size = 'md',
                                                                 leftIcon: LeftIcon,
                                                                 rightIcon: RightIcon,
                                                                 error,
                                                                 helperText,
                                                                 label,
                                                                 fullWidth = false,
                                                                 className,
                                                                 disabled,
                                                                 ...props
                                                               }, ref) => {
  const baseStyles = 'transition-colors bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const iconSizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const paddingWithIcon = {
    left: {
      sm: 'pl-9',
      md: 'pl-11',
      lg: 'pl-14',
    },
    right: {
      sm: 'pr-9',
      md: 'pr-11',
      lg: 'pr-14',
    },
  };

  const containerStyles = twMerge(
    'relative inline-block',
    fullWidth && 'w-full',
  );

  const inputStyles = twMerge(
    baseStyles,
    sizeStyles[size],
    error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    LeftIcon && paddingWithIcon.left[size],
    RightIcon && paddingWithIcon.right[size],
    fullWidth && 'w-full',
    className
  );

  const iconBaseStyles = 'absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none';
  const leftIconStyles = 'left-3';
  const rightIconStyles = 'right-3';

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className={containerStyles}>
        {LeftIcon && (
          <LeftIcon
            className={twMerge(
              iconBaseStyles,
              leftIconStyles,
              iconSizeStyles[size]
            )}
          />
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={inputStyles}
          {...props}
        />
        {RightIcon && (
          <RightIcon
            className={twMerge(
              iconBaseStyles,
              rightIconStyles,
              iconSizeStyles[size]
            )}
          />
        )}
      </div>
      {(error || helperText) && (
        <div className={twMerge(
          'mt-1 text-sm',
          error ? 'text-red-500' : 'text-gray-500'
        )}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});