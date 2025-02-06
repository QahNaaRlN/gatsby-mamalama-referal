import { useState, useEffect } from 'react';

/**
 * Интерфейс параметров UTM меток
 * @interface UTMParams
 * @property {string | null} utm_source - Источник трафика
 * @property {string | null} utm_medium - Тип трафика
 * @property {string | null} utm_campaign - Название рекламной кампании
 * @property {string | null} utm_term - Ключевое слово кампании
 * @property {string | null} utm_content - Содержание рекламного объявления
 */
interface UTMParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
}

/**
 * Хук для получения UTM-меток из URL
 *
 * @description
 * Этот хук выполняет следующие операции:
 * 1. Инициализирует состояние с пустыми UTM-метками
 * 2. При монтировании компонента извлекает UTM-метки из URL
 * 3. Сохраняет полученные метки в состоянии
 *
 * @returns {Object} Объект, содержащий параметры UTM-меток
 * @property {UTMParams} utmParams - Объект с UTM-метками
 *
 * @example
 * const { utmParams } = useUTM();
 * console.log(utmParams.utm_source); // Источник трафика
 */
export const useUTM = () => {
  const [utmParams, setUtmParams] = useState<UTMParams>({
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source') || null,
      utm_medium: params.get('utm_medium') || null,
      utm_campaign: params.get('utm_campaign') || null,
      utm_term: params.get('utm_term') || null,
      utm_content: params.get('utm_content') || null,
    });
  }, []);

  return { utmParams };
};