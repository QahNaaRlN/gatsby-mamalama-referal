/**
 * @fileoverview Константы и типы для работы с сервисами
 */

/**
 * Валюта для отображения цен
 *
 * @constant
 * @type {string}
 *
 * @example
 * const formattedPrice = `${price}${CURRENCY}`; // "1000₸"
 */
export const CURRENCY = '₸'

/**
 * Длительность услуги по умолчанию (в днях)
 *
 * @constant
 * @type {number}
 *
 * @example
 * const duration = service.duration || DEFAULT_DURATION_DAYS;
 */
export const DEFAULT_DURATION_DAYS = 3

/**
 * Типы сервисов
 *
 * @constant
 * @type {Object}
 * @property {string} STANDARD - Стандартный сервис с одной ценой
 * @property {string} SPECIAL - Специальный сервис с прайс-листом
 *
 * @example
 * if (service.type === ServiceType.STANDARD) {
 *   // Обработка стандартного сервиса
 * }
 */
export const ServiceType = {
  /** Стандартный сервис с одной ценой */
  STANDARD: 'standard',
  /** Специальный сервис с прайс-листом */
  SPECIAL: 'special',
} as const

/**
 * Тип для значений ServiceType
 *
 * @typedef {typeof ServiceType[keyof typeof ServiceType]} ServiceType
 *
 * @example
 * const serviceType: ServiceType = 'standard';
 * // или
 * const serviceType: ServiceType = 'special';
 */
export type ServiceType = typeof ServiceType[keyof typeof ServiceType]