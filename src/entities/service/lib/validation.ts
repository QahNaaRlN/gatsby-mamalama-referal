/**
 * @fileoverview Валидация для сущности "Сервис"
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
 * Проверяет обязательные поля, которые есть у всех сервисов
 *
 * @param {unknown} service - Проверяемый объект сервиса
 * @throws {ValidationError} Если какое-либо из обязательных полей отсутствует или имеет неверный формат
 * @property {string} service.documentId - Уникальный идентификатор документа
 * @property {string} service.title - Название сервиса
 * @property {object} service.description - Описание сервиса в формате rich text
 * @property {string} service.type - Тип сервиса
 * @property {number} service.duration - Продолжительность сервиса
 * @property {object} service.site - Информация о сайте
 * @property {string} service.site.domain - Домен сайта
 * @property {string} service.site.siteName - Название сайта
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
 * Проверяет поля, связанные с ценой стандартного сервиса
 *
 * @param {Partial<StandardService>} service - Объект стандартного сервиса
 * @throws {ValidationError} Если поля цены имеют неверный формат
 * @property {number} service.price - Базовая цена сервиса
 * @property {number} service.finalPrice - Конечная цена сервиса
 * @property {number} [service.discount] - Размер скидки
 * @property {number} [service.percentageDiscount] - Процент скидки
 * @property {string} [service.unit] - Единица измерения
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
 * Проверяет элемент прайс-листа специального сервиса
 *
 * @param {unknown} item - Проверяемый элемент прайс-листа
 * @throws {ValidationError} Если элемент прайс-листа имеет неверный формат
 * @property {string} item.id - Уникальный идентификатор элемента
 * @property {string} item.title - Название услуги
 * @property {number} item.price - Базовая цена
 * @property {number} item.finalPrice - Конечная цена
 * @property {number} [item.discount] - Размер скидки
 * @property {string} [item.unit] - Единица измерения
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
 * Валидирует стандартный сервис
 *
 * @param {unknown} service - Проверяемый объект сервиса
 * @throws {ValidationError} Если сервис не соответствует формату стандартного сервиса
 * @returns {StandardService} Валидированный стандартный сервис
 *
 * @example
 * const validatedService = validateStandardService({
 *   documentId: 'doc123',
 *   title: 'Стрижка',
 *   type: ServiceType.STANDARD,
 *   price: 1000,
 *   finalPrice: 900,
 *   // ...остальные поля
 * });
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
 * Валидирует специальный сервис
 *
 * @param {unknown} service - Проверяемый объект сервиса
 * @throws {ValidationError} Если сервис не соответствует формату специального сервиса
 * @returns {SpecialService} Валидированный специальный сервис
 *
 * @example
 * const validatedService = validateSpecialService({
 *   documentId: 'doc123',
 *   title: 'Комплексный уход',
 *   type: ServiceType.SPECIAL,
 *   priceList: [{
 *     id: 'item1',
 *     title: 'Базовый',
 *     price: 2000,
 *     finalPrice: 1800
 *   }],
 *   // ...остальные поля
 * });
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
 * Валидирует сервис в зависимости от его типа
 *
 * @param {unknown} service - Проверяемый объект сервиса
 * @throws {ValidationError} Если сервис не соответствует ни одному из поддерживаемых типов
 * @returns {Service} Валидированный сервис (StandardService или SpecialService)
 *
 * @example
 * const service = validateService({
 *   documentId: 'doc123',
 *   title: 'Услуга',
 *   type: ServiceType.STANDARD,
 *   // ...остальные поля
 * });
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