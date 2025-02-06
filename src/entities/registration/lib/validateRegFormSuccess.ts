import {
  validateIsObject,
  validateStringField,
  validateRichTextField,
  validateNumberField
} from "@shared/lib/validation";

import { RegFormSuccess } from '../model/types';

/**
 * Функция валидации объекта успешной регистрации
 *
 * @description
 * Функция проверяет:
 * - Наличие и корректность обязательных полей (documentId, title)
 * - Опциональные поля (subtitle, description, link)
 * - Наличие и корректность объекта site с полями domain, siteName и discount
 *
 * @param {unknown} data - Проверяемый объект формы успешной регистрации
 * @throws {ValidationError} Если объект не соответствует требованиям
 * @returns {RegFormSuccess} Валидированный объект формы
 *
 * @example
 * try {
 *   const validatedData = validateRegFormSuccess(formData);
 * } catch (error) {
 *   if (error instanceof ValidationError) {
 *     console.error('Validation failed:', error.message);
 *   }
 * }
 */
export const validateRegFormSuccess = (data: unknown): RegFormSuccess => {
  validateIsObject(data, 'RegFormSuccess');

  const success = data as Partial<RegFormSuccess>;

  validateStringField(success.documentId, 'documentId');
  validateStringField(success.title, 'title');

  if (success.subtitle !== undefined && success.subtitle !== null) {
    validateStringField(success.subtitle, 'subtitle');
  }

  if (success.description !== undefined && success.description !== null) {
    validateRichTextField(success.description, 'description');
  }

  if (success.link !== undefined && success.link !== null) {
    validateStringField(success.link, 'link');
  }

  validateIsObject(success.site, 'site');
  validateStringField(success.site?.domain, 'site.domain');
  validateStringField(success.site?.siteName, 'site.siteName');
  validateNumberField(success.site?.discount, 'site.discount');

  return success as RegFormSuccess;
};