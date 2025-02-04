import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { validateCondition } from "@entities/conditions";
import { ConditionBase } from "@entities/conditions/model";
import { useProcessData } from "@shared/hooks/useProcessData";
import { getCurrentDomain } from "@shared/lib/domain";

/**
 * Интерфейс, описывающий структуру контента условия, получаемого из Strapi
 * @interface ConditionContent
 * @property {string} documentId - Уникальный идентификатор документа
 * @property {string} title - Заголовок условия
 * @property {object} description - Описание условия
 * @property {boolean} isActive - Флаг активности условия
 * @property {object} condition - Объект с информацией об условии
 * @property {string} condition.documentId - Идентификатор документа условия
 * @property {object} [site] - Опциональная информация о сайте
 * @property {string} site.domain - Домен сайта
 * @property {string} site.siteName - Название сайта
 */

/**
 * Интерфейс ответа GraphQL запроса
 * @interface GraphQLResponse
 * @property {object} strapi - Объект с данными из Strapi
 * @property {ConditionContent[]} strapi.conditionContents - Массив контента условий
 */

/**
 * Хук для получения и обработки условий из Strapi CMS
 * 
 * @description
 * Этот хук выполняет следующие операции:
 * 1. Получает текущий домен с помощью функции getCurrentDomain
 * 2. Выполняет GraphQL запрос для получения условий из Strapi
 * 3. Обрабатывает и валидирует полученные данные
 * 4. Фильтрует условия по текущему домену (если домен определен)
 * 5. Обрабатывает возможные ошибки с помощью useProcessData
 * 
 * @returns {ReturnType<typeof useProcessData<ConditionBase>>} Обработанные данные условий с информацией о загрузке и ошибках
 * 
 * @example
 * const { data, isLoading, error } = useConditions();
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
 *   <ConditionsList conditions={data} />
 * );
 */

interface ConditionContent {
  documentId: string;
  title: string;
  description: object;
  isActive: boolean;
  condition: {
    documentId: string;
  };
  site?: {
    domain: string;
    siteName: string;
  };
}

interface GraphQLResponse {
  strapi: {
    conditionContents: ConditionContent[];
  };
}

export const useConditions = () => {
  const domain = getCurrentDomain();

  const data = useStaticQuery<GraphQLResponse>(graphql`
    query ConditionsQuery {
      strapi {
        conditionContents {
          documentId
          site {
            domain
            siteName
          }
          ...ConditionFields
        }
      }
    }
  `);

  // Выносим обработку данных в отдельный useMemo
  const processedData = useMemo(() => {
    const formattedData = data.strapi.conditionContents.map((item) => {
      return validateCondition(item);
    });

    // Фильтрация по домену
    return domain
      ? formattedData.filter((item) => item.site?.domain === domain)
      : formattedData;
  }, [data.strapi.conditionContents, domain]);

  // Используем упрощенный useProcessData только для обработки ошибок
  return useProcessData<ConditionBase>(processedData);
};