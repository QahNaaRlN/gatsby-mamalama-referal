/**
 * Селекторы для работы с FAQ
 * @module FAQSelectors
 */

import { FAQ } from '@entities/faq/model/types';

/**
 * Возвращает все вопросы FAQ
 * @function
 * @param {FAQ[] | undefined} faqs - Массив вопросов FAQ
 * @returns {FAQ[]} Массив вопросов или пустой массив
 */
export const selectAllFAQs = (faqs: FAQ[] | undefined): FAQ[] => {
  return faqs || [];
};