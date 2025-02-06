import { graphql } from "gatsby";

/**
 * GraphQL фрагмент для получения полей условий из Strapi CMS
 *
 * @typedef {Object} Strapi_ConditionContent
 * @property {string} documentId - Уникальный идентификатор документа
 * @property {string} title - Заголовок условия
 * @property {string} description - Описание условия
 * @property {boolean} isActive - Статус активности условия
 * @property {Object} condition - Связанное условие
 * @property {string} condition.documentId - Идентификатор связанного условия
 * @property {Object} site - Информация о сайте
 * @property {string} site.domain - Домен сайта
 * @property {string} site.siteName - Название сайта
 */
export const conditionFields = graphql`
  fragment ConditionFields on Strapi_ConditionContent {
    documentId
    title
    description
    isActive
    condition {
      documentId
    }
    site {
      domain
      siteName
    }
  }
`;