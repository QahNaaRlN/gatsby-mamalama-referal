/**
 * @fileoverview Хук для получения и обработки данных сервисов из Strapi CMS
 */

import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { validateService } from "@entities/service/lib/validation";
import { ServiceType } from "@entities/service/model/consts";
import type { PriceListItem, Service, UploadFile } from "@entities/service/model/types";
import { useProcessData } from "@shared/hooks/useProcessData";
import { getCurrentDomain } from "@shared/lib/domain";

/**
 * Интерфейс ответа GraphQL запроса
 *
 * @interface GraphQLResponse
 * @property {object} strapi - Объект с данными из Strapi
 * @property {object[]} strapi.serviceContents - Массив контента сервисов
 * @property {string} strapi.serviceContents[].documentId - Уникальный идентификатор документа
 * @property {string} strapi.serviceContents[].title - Заголовок сервиса
 * @property {object} strapi.serviceContents[].description - Описание сервиса
 * @property {number} strapi.serviceContents[].duration - Продолжительность сервиса
 * @property {ServiceType} strapi.serviceContents[].type - Тип сервиса
 * @property {UploadFile} strapi.serviceContents[].picture - Изображение сервиса
 * @property {string} [strapi.serviceContents[].pictureClassnames] - CSS классы для изображения
 * @property {number} [strapi.serviceContents[].price] - Цена сервиса
 * @property {number} [strapi.serviceContents[].discount] - Размер скидки
 * @property {number} [strapi.serviceContents[].percentageDiscount] - Процент скидки
 * @property {number} [strapi.serviceContents[].finalPrice] - Конечная цена
 * @property {string} [strapi.serviceContents[].unit] - Единица измерения
 * @property {PriceListItem[]} [strapi.serviceContents[].priceList] - Список цен
 * @property {object} [strapi.serviceContents[].site] - Информация о сайте
 * @property {string} strapi.serviceContents[].site.domain - Домен сайта
 * @property {string} strapi.serviceContents[].site.siteName - Название сайта
 */
interface GraphQLResponse {
  strapi: {
    serviceContents: {
      documentId: string;
      title: string;
      description: object;
      duration: number;
      type: ServiceType;
      picture: UploadFile;
      pictureClassnames?: string;
      price?: number;
      discount?: number;
      percentageDiscount?: number;
      finalPrice?: number;
      unit?: string;
      priceList?: PriceListItem[];
      site?: {
        domain: string;
        siteName: string;
      };
    }[];
  };
}

/**
 * Хук для получения и обработки сервисов из Strapi CMS
 *
 * @description
 * Этот хук выполняет следующие операции:
 * 1. Получает текущий домен с помощью функции getCurrentDomain
 * 2. Выполняет GraphQL запрос для получения сервисов из Strapi
 * 3. Обрабатывает и валидирует полученные данные
 * 4. Фильтрует сервисы по текущему домену (если домен определен)
 * 5. Обрабатывает возможные ошибки с помощью useProcessData
 *
 * @returns {ReturnType<typeof useProcessData<Service>>} Обработанные данные сервисов с информацией о загрузке и ошибках
 *
 * @example
 * const { data, isLoading, error } = useServices();
 *
 * if (isLoading) {
 *   return <Loader />;
 * }
 *
 * if (error) {
 *   return <ErrorMessage error={error} />;
 * }
 *
 * return (
 *   <ServicesList services={data} />
 * );
 */
export const useServices = () => {
  const domain = getCurrentDomain();

  const data = useStaticQuery<GraphQLResponse>(graphql`
    query ServicesContentQuery {
      strapi {
        serviceContents {
          documentId
          site {
            domain
            siteName
          }
          ...ServiceContentFields
        }
      }
    }
  `);

  const processedData = useMemo(() => {
    const formattedData = data.strapi.serviceContents.map((item) => {
      return validateService(item);
    });

    return domain
      ? formattedData.filter((item) => item.site?.domain === domain)
      : formattedData;
  }, [data.strapi.serviceContents, domain]);

  return useProcessData<Service>(processedData);
};