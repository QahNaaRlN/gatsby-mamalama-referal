// entities/service/lib/validateService.ts
/**
 * @fileoverview Валидация для сущности "Сервис".
 */
import { ServiceType } from '@entities/service/model/consts';
import type { Service, StandardService, SpecialService, PriceListItem } from '@entities/service/model/types';
import {
  validateIsObject,
  validateStringField,
  validateNumberField,
  validateArrayField,
  validateRichTextField,
  ValidationError,
} from '@shared/lib/validation';

/**
 * Проверяет обязательные поля, которые есть у всех сервисов.
 */
const validateServiceBaseFields = (service: unknown): void => {
  validateIsObject(service, 'Service');
  const s = service as Partial<Service>;

  validateStringField(s.documentId, 'Document ID');
  validateStringField(s.title, 'Title');
  validateRichTextField(s.description, 'Description');
  validateStringField(s.type, 'Type');
  validateNumberField(s.duration, 'Duration');

  if (!s.site || typeof s.site !== 'object') {
    throw new ValidationError('Service must have a site object');
  }
  validateStringField(s.site.domain, 'Site Domain');
  validateStringField(s.site.siteName, 'Site Name');
};

/**
 * Проверяет поля, связанные с ценой.
 */
const validatePriceFields = (service: Partial<StandardService>): void => {
  validateNumberField(service.price, 'Price');
  validateNumberField(service.finalPrice, 'Final Price');

  if (service.discount !== undefined && service.discount !== null) {
    validateNumberField(service.discount, 'Discount');
  }
  if (service.percentageDiscount !== undefined && service.percentageDiscount !== null) {
    validateNumberField(service.percentageDiscount, 'Percentage Discount');
  }
  if (service.unit !== undefined && service.unit !== null) {
    validateStringField(service.unit, 'Unit');
  }
};

/**
 * Проверяет элемент прайс-листа.
 */
const validatePriceListItem = (item: unknown): void => {
  validateIsObject(item, 'Price List Item');
  const i = item as Partial<PriceListItem>;

  validateStringField(i.id, 'Price List Item ID');
  validateStringField(i.title, 'Price List Item Title');
  validateNumberField(i.price, 'Price List Item Price');
  validateNumberField(i.finalPrice, 'Price List Item Final Price');

  if (i.discount !== undefined) {
    validateNumberField(i.discount, 'Price List Item Discount');
  }
  if (i.unit !== undefined) {
    validateStringField(i.unit, 'Price List Item Unit');
  }
};

/**
 * Валидирует стандартный сервис.
 */
export const validateStandardService = (service: unknown): StandardService => {
  validateServiceBaseFields(service);
  const s = service as Partial<StandardService>;

  if (s.type !== ServiceType.STANDARD) {
    throw new ValidationError('Invalid service type for standard service');
  }

  validatePriceFields(s);

  return s as StandardService;
};

/**
 * Валидирует специальный сервис.
 */
export const validateSpecialService = (service: unknown): SpecialService => {
  validateServiceBaseFields(service);
  const s = service as Partial<SpecialService>;

  if (s.type !== ServiceType.SPECIAL) {
    throw new ValidationError('Invalid service type for special service');
  }

  validateArrayField(s.priceList, 'Price List');
  s.priceList?.forEach((item) => validatePriceListItem(item));

  return s as SpecialService;
};

/**
 * Валидирует сервис в зависимости от его типа.
 */
export const validateService = (service: unknown): Service => {
  validateServiceBaseFields(service);
  const s = service as Partial<Service>;

  if (s.type === ServiceType.SPECIAL) {
    return validateSpecialService(service);
  } else if (s.type === ServiceType.STANDARD) {
    return validateStandardService(service);
  } else {
    throw new ValidationError('Invalid service type');
  }
};