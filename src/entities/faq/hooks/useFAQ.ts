import { graphql, useStaticQuery } from "gatsby";
import { useMemo } from "react";

import { FAQ, validateFAQ } from "@entities/faq";
import { useProcessData } from "@shared/hooks/useProcessData";
import { getCurrentDomain } from "@shared/lib/domain";

/**
 * Интерфейс, описывающий структуру контента FAQ, получаемого из Strapi
 * @interface FAQContent
 * @property {string} documentId - Уникальный идентификатор документа
 * @property {string} question - Текст вопроса
 * @property {string} answer - Текст ответа
 * @property {boolean} isExpanded - Флаг развернутого состояния
 * @property {object} [site] - Опциональная информация о сайте
 * @property {string} site.domain - Домен сайта
 * @property {string} site.siteName - Название сайта
 */
interface FAQContent {
  documentId: string;
  question: string;
  answer: string;
  isExpanded: boolean;
  site?: {
    domain: string;
    siteName: string;
  };
}

/**
 * Интерфейс ответа GraphQL запроса
 * @interface GraphQLResponse
 * @property {object} strapi - Объект с данными из Strapi
 * @property {FAQContent[]} strapi.faqContents - Массив контента FAQ
 */
interface GraphQLResponse {
  strapi: {
    faqContents: FAQContent[];
  };
}

/**
 * Хук для получения и обработки FAQ из Strapi CMS
 *
 * @description
 * Этот хук выполняет следующие операции:
 * 1. Получает текущий домен с помощью функции getCurrentDomain
 * 2. Выполняет GraphQL запрос для получения FAQ из Strapi
 * 3. Обрабатывает и валидирует полученные данные
 * 4. Фильтрует FAQ по текущему домену (если домен определен)
 * 5. Обрабатывает возможные ошибки с помощью useProcessData
 *
 * @returns {ReturnType<typeof useProcessData<FAQ>>} Обработанные данные FAQ с информацией о загрузке и ошибках
 *
 * @example
 * const { data, isLoading, error } = useFAQ();
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
 *   <FAQList items={data} />
 * );
 */
export const useFAQ = (): ReturnType<typeof useProcessData<FAQ>> => {
  const domain = getCurrentDomain();

  const data = useStaticQuery<GraphQLResponse>(graphql`
    query FAQQuery {
      strapi {
        faqContents {
          documentId
          site {
            domain
            siteName
          }
          ...FAQFields
        }
      }
    }
  `);

  const processedData = useMemo(() => {
    const formattedData = data.strapi.faqContents.map((item) => {
      return validateFAQ(item);
    });

    return domain
      ? formattedData.filter((item) => item.site?.domain === domain)
      : formattedData;
  }, [data.strapi.faqContents, domain]);

  return useProcessData<FAQ>(processedData);
};