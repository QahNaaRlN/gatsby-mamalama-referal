/**
 * @fileoverview Селекторы для работы с сервисами
 */

import { ServiceType } from '@entities/service/model/consts';
import { type Service, type StandardService, type SpecialService } from '@entities/service/model/types';


/**
 * Результат группировки сервисов по типу
 */
interface GroupedServices {
  /** Специальные сервисы с прайс-листом */
  special: SpecialService[];
  /** Стандартные сервисы с фиксированной ценой */
  standard: StandardService[];
}

/**
 * Группирует сервисы по их типу
 * @param {Service[]} services - Массив сервисов для группировки
 * @returns {GroupedServices} Объект с сгруппированными сервисами
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