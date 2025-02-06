import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { validateRegFormSuccess } from "@entities/registration/lib";
import { useProcessData } from "@shared/hooks/useProcessData";
import { getCurrentDomain } from "@shared/lib/domain";

import { RegFormSuccess } from "../model/types";

/**
 * Интерфейс, описывающий структуру контента успешной регистрации из Strapi
 * @interface RegFormSuccessContent
 * @property {string} documentId - Уникальный идентификатор документа
 * @property {object} [site] - Опциональная информация о сайте
 * @property {string} site.domain - Домен сайта
 * @property {string} site.siteName - Название сайта
 * @property {string} site.discount - Размер скидки
 */
interface RegFormSuccessContent {
  documentId: string;
  site?: {
    domain: string;
    siteName: string;
    discount: string;
  };
}

/**
 * Интерфейс ответа GraphQL запроса
 * @interface GraphQLResponse
 * @property {object} strapi - Объект с данными из Strapi
 * @property {RegFormSuccessContent[]} strapi.registrationFormSuccessContents - Массив контента успешной регистрации
 */
interface GraphQLResponse {
  strapi: {
    registrationFormSuccessContents: RegFormSuccessContent[];
  };
}

/**
 * Хук для получения и обработки контента успешной регистрации из Strapi CMS
 *
 * @description
 * Этот хук выполняет следующие операции:
 * 1. Получает текущий домен с помощью функции getCurrentDomain
 * 2. Выполняет GraphQL запрос для получения контента из Strapi
 * 3. Обрабатывает и валидирует полученные данные
 * 4. Фильтрует контент по текущему домену (если домен определен)
 * 5. Обрабатывает возможные ошибки с помощью useProcessData
 *
 * @returns {ReturnType<typeof useProcessData<RegFormSuccess>>} Обработанные данные с информацией о загрузке и ошибках
 *
 * @example
 * const { data, isLoading, error } = useRegistrationSuccess();
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
 *   <SuccessMessage data={data} />
 * );
 */
export const useRegistrationSuccess = () => {
  const domain = getCurrentDomain();

  const data = useStaticQuery<GraphQLResponse>(graphql`
    query RegFormSuccessQuery {
      strapi {
        registrationFormSuccessContents {
          documentId
          site {
            domain
            siteName
            discount
          }
          ...RegFormSuccessFields
        }
      }
    }
  `);

  const processedData = useMemo(() => {
    const formattedData = data.strapi.registrationFormSuccessContents.map((item) => {
      return validateRegFormSuccess(item);
    });

    return domain
      ? formattedData.filter((item) => item.site?.domain === domain)
      : formattedData;
  }, [data.strapi.registrationFormSuccessContents, domain]);

  return useProcessData<RegFormSuccess>(processedData);
};