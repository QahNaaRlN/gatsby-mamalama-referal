import { validateIsObject, validateStringField, validateRichTextField } from '@shared/lib/validation';

import { RegFormPromo } from '../model/types';

/**
 * Функция валидации объекта промо-формы регистрации
 *
 * @description
 * Функция проверяет:
 * - Наличие и корректность основных полей (documentId, title, description)
 * - Опциональное поле subtitle
 * - Наличие и корректность объекта site с полями domain и siteName
 *
 * @param {unknown} data - Проверяемый объект промо-формы
 * @throws {ValidationError} Если объект не соответствует требованиям
 * @returns {RegFormPromo} Валидированный объект промо-формы
 *
 * @example
 * try {
 *   const validatedData = validateRegFormPromo(formData);
 * } catch (error) {
 *   if (error instanceof ValidationError) {
 *     console.error('Validation failed:', error.message);
 *   }
 * }
 */
export const validateRegFormPromo = (data: unknown): RegFormPromo => {
  validateIsObject(data, 'RegFormPromo');

  const promo = data as Partial<RegFormPromo>;

  validateStringField(promo.documentId, 'documentId');
  validateStringField(promo.title, 'title');
  if (promo.subtitle !== undefined && promo.subtitle !== null) {
    validateStringField(promo.subtitle, 'subtitle');
  }
  validateRichTextField(promo.description, 'description');

  validateIsObject(promo.site, 'site');
  validateStringField(promo.site?.domain, 'site.domain');
  validateStringField(promo.site?.siteName, 'site.siteName');

  return promo as RegFormPromo;
};