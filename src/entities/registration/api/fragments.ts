import { graphql } from "gatsby";

/**
 * GraphQL фрагмент для получения полей промо-контента формы регистрации из Strapi CMS
 *
 * @typedef {Object} Strapi_RegistrationFormPromoContent
 * @property {string} documentId - Уникальный идентификатор документа
 * @property {string} title - Заголовок формы
 * @property {string} subtitle - Подзаголовок формы
 * @property {string} description - Описание формы
 * @property {Object} site - Информация о сайте
 * @property {string} site.domain - Домен сайта
 * @property {string} site.siteName - Название сайта
 * @property {number} site.discount - Размер скидки
 */
export const regFormPromoFields = graphql`
  fragment RegFormPromoFields on Strapi_RegistrationFormPromoContent {
    documentId
    title
    subtitle
    description
    site {
      domain
      siteName
      discount
    }
  }
`;

/**
 * GraphQL фрагмент для получения полей успешной регистрации из Strapi CMS
 *
 * @typedef {Object} Strapi_RegistrationFormSuccessContent
 * @property {string} documentId - Уникальный идентификатор документа
 * @property {string} title - Заголовок сообщения об успехе
 * @property {string} subtitle - Подзаголовок сообщения
 * @property {string} description - Описание результата
 * @property {string} link - Ссылка для перехода
 * @property {Object} site - Информация о сайте
 * @property {string} site.domain - Домен сайта
 * @property {string} site.siteName - Название сайта
 * @property {number} site.discount - Размер скидки
 */
export const regFormSuccessFields = graphql`
  fragment RegFormSuccessFields on Strapi_RegistrationFormSuccessContent {
    documentId
    title
    subtitle
    description
    link
    site {
      domain
      siteName
      discount
    }
  }
`;