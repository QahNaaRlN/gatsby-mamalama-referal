/**
 * @fileoverview Хук для получения данных сервисов через GraphQL с учетом настроенного источника данных Strapi
 */

import { graphql, useStaticQuery } from "gatsby";
import { useState, useEffect } from 'react';

import { validateService } from '../lib/validation';
import type { Service } from '../model/types';

/**
 * Результат выполнения хука useServices
 */
interface UseServicesResult {
  /** Список валидных сервисов */
  services: Service[];
  /** Ошибка, если произошла */
  error: Error | null;
  /** Флаг загрузки данных */
  loading: boolean;
}

/**
 * Хук для получения и валидации данных сервисов через настроенный источник данных Strapi
 * @returns {UseServicesResult} Результат с сервисами и статусом
 */
export const useServices = (): UseServicesResult => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);

  const data = useStaticQuery(graphql`
    query ServicesQuery {
      strapi {
        services {
          ...ServiceFields
        }
      }
    }
  `);

  useEffect(() => {
    try {
      const servicesData = data.strapi.services;
      console.log('Raw services data:', data.strapi.services);
      const validatedServices = servicesData.map((service: Service) => {
        validateService(service);
        return service;
      });

      setServices(validatedServices);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Неизвестная ошибка при обработке данных сервисов'));
      console.error('Ошибка обработки сервисов:', err);
    } finally {
      setLoading(false);
    }
  }, [data]);

  return { services, error, loading };
};

export type { UseServicesResult };