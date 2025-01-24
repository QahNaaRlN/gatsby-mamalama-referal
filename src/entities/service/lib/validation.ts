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
  validateStringField(s.type, 'Type');
};

/**
 * Проверяет поля, связанные с ценой.
 */
const validatePriceFields = (price: unknown): void => {
  validateIsObject(price, 'Price info');

  const p = price as Partial<{ price: number; finalPrice: number; discount: number }>;

  validateNumberField(p.price, 'Price');
  validateNumberField(p.finalPrice, 'Final price');
  validateNumberField(p.discount, 'Discount');
};

/**
 * Проверяет элемент прайс-листа.
 */
const validatePriceListItem = (item: unknown): void => {
  validateIsObject(item, 'Price list item');

  const i = item as Partial<PriceListItem>;

  validateStringField(i.title, 'Title');
  validatePriceFields(i);
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

  validateArrayField(s.priceList, 'Price list');
  s.priceList?.forEach((item) => validatePriceListItem(item));

  return s as SpecialService;
};

/**
 * Валидирует сервис в зависимости от его типа.
 */
export const validateService = (service: unknown): Service => {
  validateServiceBaseFields(service);

  const s = service as Service;

  if (s.type === ServiceType.SPECIAL) {
    return validateSpecialService(s);
  } else {
    return validateStandardService(s);
  }
};