import { graphql } from "gatsby";

/**
 * GraphQL фрагмент для получения полей FAQ контента из Strapi CMS
 *
 * @typedef {Object} Strapi_FaqContent
 * @property {string} documentId - Уникальный идентификатор FAQ документа
 * @property {string} question - Текст вопроса
 * @property {string} answer - Текст ответа
 * @property {boolean} isExpanded - Флаг развернутого состояния вопроса
 * @property {Object} site - Информация о сайте
 * @property {string} site.domain - Домен сайта
 * @property {string} site.siteName - Название сайта
 */
export const faqFields = graphql`
  fragment FAQFields on Strapi_FaqContent {
    documentId
    question
    answer
    isExpanded
    site {
      domain
      siteName
    }
  }
`;