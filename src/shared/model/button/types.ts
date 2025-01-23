import { ButtonHTMLAttributes } from 'react';

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