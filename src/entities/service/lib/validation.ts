/**
 * @fileoverview Функции валидации для сервисов
 */

import { ServiceType } from '../model/consts';
import type { Service, StandardService, SpecialService } from '../model/types';

/**
 * Ошибка валидации сервиса
 */
export class ServiceValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceValidationError';
  }
}

/**
 * Проверяет обязательные поля сервиса
 */
const validateBaseFields = (service: unknown): void => {
  if (!service || typeof service !== 'object') {
    throw new ServiceValidationError('Service must be an object');
  }

  const s = service as Partial<Service>;

  if (!s.documentId) {
    throw new ServiceValidationError('Service must have a documentId');
  }
  if (!s.title) {
    throw new ServiceValidationError('Service must have a title');
  }
  if (!s.type) {
    throw new ServiceValidationError('Service must have a type');
  }
}

/**
 * Проверяет тип данных для числовых полей
 */
const validateNumberField = (value: unknown, fieldName: string): void => {
  if (value !== undefined && typeof value !== 'number') {
    throw new ServiceValidationError(`${fieldName} must be a number if provided`);
  }
}

/**
 * Проверяет опциональные поля цены
 */
const validatePriceFields = (price: unknown): void => {
  if (!price || typeof price !== 'object') {
    throw new ServiceValidationError('Price info must be an object');
  }

  const p = price as Partial<StandardService>;

  validateNumberField(p.price, 'Price');
  validateNumberField(p.finalPrice, 'Final price');
  validateNumberField(p.discount, 'Discount');
}

/**
 * Проверяет стандартный сервис
 */
export const validateStandardService = (service: unknown): void => {
  validateBaseFields(service);

  const s = service as StandardService;
  validatePriceFields(s);

  if (s.type !== ServiceType.STANDARD) {
    throw new ServiceValidationError('Invalid service type for standard service');
  }
}

/**
 * Проверяет специальный сервис
 */
export const validateSpecialService = (service: unknown): void => {
  validateBaseFields(service);

  const s = service as SpecialService;

  if (s.type !== ServiceType.SPECIAL) {
    throw new ServiceValidationError('Invalid service type for special service');
  }

  if (!Array.isArray(s.priceList)) {
    throw new ServiceValidationError('Special service must have a price list array');
  }

  s.priceList.forEach((item, index) => {
    if (!item.title) {
      throw new ServiceValidationError(`Price list item ${index} must have a title`);
    }
    validatePriceFields(item);
  });
}

/**
 * Валидирует сервис в зависимости от его типа
 */
export const validateService = (service: unknown): void => {
  validateBaseFields(service);

  const s = service as Service;

  if (s.type === ServiceType.SPECIAL) {
    validateSpecialService(s);
  } else {
    validateStandardService(s);
  }
};