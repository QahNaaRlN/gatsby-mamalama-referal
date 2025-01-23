/**
 * Валюта для отображения цен
 */
export const CURRENCY = '₸'

/**
 * Длительность услуги по умолчанию (в днях)
 */
export const DEFAULT_DURATION_DAYS = 3

/**
 * Типы сервисов
 * @const
 */
export const ServiceType = {
  /** Стандартный сервис с одной ценой */
  STANDARD: 'standard',
  /** Специальный сервис с прайс-листом */
  SPECIAL: 'special',
} as const

/**
 * Тип для значений ServiceType
 */
export type ServiceType = typeof ServiceType[keyof typeof ServiceType]