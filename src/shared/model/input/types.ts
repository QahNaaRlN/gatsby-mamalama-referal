import { InputHTMLAttributes } from 'react';

import { LucideIcon } from 'lucide-react';

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