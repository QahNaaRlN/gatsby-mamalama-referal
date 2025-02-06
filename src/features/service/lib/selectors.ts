/**
 * @fileoverview Селекторы для работы с сервисами
 */

import { ServiceType } from '@entities/service/model/consts';
import { type Service, type StandardService, type SpecialService } from '@entities/service/model/types';

/**
 * Результат группировки сервисов по типу
 * @interface GroupedServices
 * @property {SpecialService[]} special - Специальные сервисы с прайс-листом
 * @property {StandardService[]} standard - Стандартные сервисы с фиксированной ценой
 */
interface GroupedServices {
  special: SpecialService[];
  standard: StandardService[];
}

/**
 * Группирует сервисы по их типу (специальные/стандартные)
 *
 * @description
 * Функция принимает массив сервисов и разделяет их на две категории:
 * - Специальные сервисы (special) - имеют прайс-лист
 * - Стандартные сервисы (standard) - имеют фиксированную цену
 *
 * @param {Service[]} services - Массив сервисов для группировки
 * @returns {GroupedServices} Объект с сгруппированными сервисами
 *
 * @example
 * const services = [
 *   { type: ServiceType.SPECIAL, ... },
 *   { type: ServiceType.STANDARD, ... }
 * ];
 * const grouped = groupServicesByType(services);
 * // Результат: { special: [...], standard: [...] }
 */
export const groupServicesByType = (services: Service[]): GroupedServices => {
  return services.reduce<GroupedServices>(
    (groups, service) => {
      if (service.type === ServiceType.SPECIAL) {
        groups.special.push(service as SpecialService);
      } else {
        groups.standard.push(service as StandardService);
      }
      return groups;
    },
    { special: [], standard: [] }
  );
};