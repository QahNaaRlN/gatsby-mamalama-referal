import { ValidationError, validateIsObject, validateStringField, validateRichTextField } from '@shared/lib/validation';

import { RegFormPromo } from '../model/types';


export const validateRegFormPromo = (data: unknown): RegFormPromo => {
  validateIsObject(data, 'RegFormPromo');

  const promo = data as Partial<RegFormPromo>;

  // Валидация основных полей
  validateStringField(promo.documentId, 'documentId');
  validateStringField(promo.title, 'title');
  if (promo.subtitle !== undefined && promo.subtitle !== null) {
    validateStringField(promo.subtitle, 'subtitle');
  }
  validateRichTextField(promo.description, 'description');

  // Валидация site
  validateIsObject(promo.site, 'site');
  validateStringField(promo.site?.domain, 'site.domain');
  validateStringField(promo.site?.siteName, 'site.siteName');

  if (!promo.site || typeof promo.site !== 'object') {
    throw new ValidationError('RegForm must have a site object');
  }
  validateStringField(promo.site.domain, 'Site Domain');
  validateStringField(promo.site.siteName, 'Site Name');

  return promo as RegFormPromo;
};