import { Loader2 } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Вариант стилизации кнопки
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /**
   * Размер кнопки
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Состояние загрузки
   */
  isLoading?: boolean;
  /**
   * Растягивать ли кнопку на всю ширину контейнера
   */
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}) => {
  // Base classes that will always be applied
  const baseClasses = "inline-flex items-center justify-center gap-2.5 font-medium transition-colors rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-center";

  // Статические классы для каждого варианта
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    ghost: "btn-ghost"
  };

  // Статические классы для размеров
  const sizes = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg"
  };

  const classes = twMerge(
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    className
  );

  return (
    <button 
      className={classes} 
      disabled={disabled || isLoading} 
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Загрузка...
        </>
      ) : (
        children
      )}
    </button>
  );
};