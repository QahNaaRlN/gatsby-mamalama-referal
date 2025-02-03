import {
  ValidationError,
  validateIsObject,
  validateStringField,
  validateRichTextField,
  validateNumberField
} from "@shared/lib/validation";

import { RegFormSuccess } from '../model/types';

export const validateRegFormSuccess = (data: unknown): RegFormSuccess => {
  validateIsObject(data, 'RegFormSuccess');

  const success = data as Partial<RegFormSuccess>;

  // Валидация основных полей
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

  // Валидация site
  validateIsObject(success.site, 'site');

  if (!success.site || typeof success.site !== 'object') {
    throw new ValidationError('RegFormSuccess must have a site object');
  }

  validateStringField(success.site.domain, 'site.domain');
  validateStringField(success.site.siteName, 'site.siteName');
  validateNumberField(success.site.discount, 'site.discount');

  return success as RegFormSuccess;
};