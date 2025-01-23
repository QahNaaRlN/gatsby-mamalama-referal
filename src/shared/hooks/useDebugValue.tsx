/**
 * @fileoverview Хук для отладки данных в компонентах Gatsby
 */

import { useEffect } from 'react';

/**
 * Хук для отладки данных в компонентах
 * Выводит данные в консоль только на клиенте
 */
export const useDebugValue = (data: unknown, label = 'Debug data') => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${label}]:`, data)
    }
  }, [data, label])
}