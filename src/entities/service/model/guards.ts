/**
 * @fileoverview Функции-предикаты для определения типов сервисов
 */

import { ServiceType } from './consts'
import type { Service, StandardService, SpecialService } from './types'

/**
 * Проверяет, является ли сервис специальным (с прайс-листом)
 *
 * @description
 * Функция является type guard'ом, сужающим тип Service до SpecialService.
 * После проверки TypeScript будет знать точный тип сервиса.
 *
 * @param {Service} service - Сервис для проверки
 * @returns {boolean} true если сервис специальный
 *
 * @example
 * if (isSpecialService(service)) {
 *   // TypeScript знает, что service имеет тип SpecialService
 *   console.log(service.priceList);
 * }
 */
export const isSpecialService = (
  service: Service
): service is SpecialService => {
  return service.type === ServiceType.SPECIAL
}

/**
 * Проверяет, является ли сервис стандартным (с одной ценой)
 *
 * @description
 * Функция является type guard'ом, сужающим тип Service до StandardService.
 * После проверки TypeScript будет знать точный тип сервиса.
 *
 * @param {Service} service - Сервис для проверки
 * @returns {boolean} true если сервис стандартный
 *
 * @example
 * if (isStandardService(service)) {
 * TypeScript знает, что service имеет тип StandardService
 * console.log(service.price);
 * }
 *
 * @example
 * const services = [service1, service2];
 * const standardServices = services.filter(isStandardService);
 * standardServices имеет тип StandardService[]
 */
export const isStandardService = (
  service: Service
): service is StandardService => {
  return service.type === ServiceType.STANDARD
}