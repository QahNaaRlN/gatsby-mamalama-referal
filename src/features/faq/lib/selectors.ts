import { FAQ } from '@entities/faq/model/types';

/**
 * Селектор для получения всех вопросов
 */
export const selectAllFAQs = (faqs: FAQ[] | undefined): FAQ[] => {
  return faqs || [];
};