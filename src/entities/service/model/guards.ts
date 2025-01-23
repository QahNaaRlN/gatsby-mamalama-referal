import { ServiceType } from './consts'
import type { Service, StandardService, SpecialService } from './types'

/**
 * Проверяет, является ли сервис специальным (с прайс-листом)
 * @param {Service} service - Сервис для проверки
 * @returns {boolean} true если сервис специальный
 */
export const isSpecialService = (
  service: Service
): service is SpecialService => {
  return service.type === ServiceType.SPECIAL
}

/**
 * Проверяет, является ли сервис стандартным (с одной ценой)
 * @param {Service} service - Сервис для проверки
 * @returns {boolean} true если сервис стандартный
 */
export const isStandardService = (
  service: Service
): service is StandardService => {
  return service.type === ServiceType.STANDARD
}