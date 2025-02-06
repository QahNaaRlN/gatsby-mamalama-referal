import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { validateRegFormPromo } from "@entities/registration/lib";
import { useProcessData } from "@shared/hooks/useProcessData";
import { getCurrentDomain } from "@shared/lib/domain";

import { RegFormPromo } from "../model/types";

/**
 * Интерфейс, описывающий структуру промо-контента формы регистрации из Strapi
 * @interface RegFormPromoContent
 * @property {string} documentId - Уникальный идентификатор документа
 * @property {object} [site] - Опциональная информация о сайте
 * @property {string} site.domain - Домен сайта
 * @property {string} site.siteName - Название сайта
 * @property {string} site.discount - Размер скидки
 */
interface RegFormPromoContent {
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
 * @property {RegFormPromoContent[]} strapi.registrationFormPromoContents - Массив промо-контента форм регистрации
 */
interface GraphQLResponse {
  strapi: {
    registrationFormPromoContents: RegFormPromoContent[];
  };
}

/**
 * Хук для получения и обработки промо-контента форм регистрации из Strapi CMS
 *
 * @description
 * Этот хук выполняет следующие операции:
 * 1. Получает текущий домен
 * 2. Выполняет GraphQL запрос для получения промо-контента
 * 3. Обрабатывает и валидирует полученные данные
 * 4. Фильтрует контент по текущему домену
 * 5. Обрабатывает возможные ошибки
 *
 * @returns {ReturnType<typeof useProcessData<RegFormPromo>>} Обработанные данные с информацией о загрузке и ошибках
 */
export const useRegistration = (): ReturnType<typeof useProcessData<RegFormPromo>> => {
  const domain = getCurrentDomain();

  const data = useStaticQuery<GraphQLResponse>(graphql`
    query RegFormPromoQuery {
      strapi {
        registrationFormPromoContents {
          documentId
          site {
            domain
            siteName
            discount
          }
          ...RegFormPromoFields
        }
      }
    }
  `);

  const processedData = useMemo(() => {
    const formattedData = data.strapi.registrationFormPromoContents.map((item) => {
      return validateRegFormPromo(item);
    });

    return domain
      ? formattedData.filter((item) => item.site?.domain === domain)
      : formattedData;
  }, [data.strapi.registrationFormPromoContents, domain]);

  return useProcessData<RegFormPromo>(processedData);
};