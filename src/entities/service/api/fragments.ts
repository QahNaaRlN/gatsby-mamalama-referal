/**
 * @fileoverview GraphQL фрагменты для запроса данных сервисов из Strapi через настроенный источник данных
 */

import { graphql } from "gatsby";

/**
 * GraphQL фрагмент для получения полей изображения из Strapi CMS
 *
 * @typedef {Object} Strapi_UploadFile
 * @property {Object} formats - Форматы изображения
 * @property {string} name - Имя файла
 * @property {string} mime - MIME-тип файла
 * @property {number} size - Размер файла
 * @property {string} url - URL изображения
 * @property {number} width - Ширина изображения
 * @property {number} height - Высота изображения
 */
export const imageFields = graphql`
  fragment ServiceImageFields on Strapi_UploadFile {
    formats
    name
    mime
    size
    url
    width
    height
  }
`;

/**
 * GraphQL фрагмент для получения полей элемента прайс-листа
 *
 * @typedef {Object} Strapi_ComponentPriceListPriceListItem
 * @property {string} id - Уникальный идентификатор элемента
 * @property {string} title - Название услуги
 * @property {number} price - Исходная цена
 * @property {number} discount - Размер скидки
 * @property {number} finalPrice - Конечная цена с учетом скидки
 */
export const priceListItemFields = graphql`
  fragment ServicePriceListFields on Strapi_ComponentPriceListPriceListItem {
    id
    title
    price
    discount
    finalPrice
  }
`;

/**
 * GraphQL фрагмент для получения полей сайта
 *
 * @typedef {Object} Strapi_Site
 * @property {string} domain - Домен сайта
 * @property {string} siteName - Название сайта
 */
export const siteFields = graphql`
  fragment SiteFields on Strapi_Site {
    domain
    siteName
  }
`;

/**
 * GraphQL фрагмент для получения базовых полей связанного сервиса
 *
 * @typedef {Object} Strapi_Service
 * @property {string} slug - URL-совместимый идентификатор сервиса
 */
export const serviceRelationFields = graphql`
  fragment ServiceRelationFields on Strapi_Service {
    slug
  }
`;

/**
 * GraphQL фрагмент для получения базовых полей контента сервиса
 *
 * @typedef {Object} Strapi_ServiceContentBase
 * @property {string} documentId - Уникальный идентификатор документа
 * @property {string} title - Название сервиса
 * @property {object} description - Описание сервиса
 * @property {string} duration - Продолжительность оказания услуги
 * @property {string} type - Тип сервиса
 * @property {string} pictureClassnames - CSS классы для изображения
 * @property {Strapi_Service} service - Связанный сервис
 * @property {Strapi_Site} site - Связанный сайт
 */
export const serviceContentBaseFields = graphql`
  fragment ServiceContentBaseFields on Strapi_ServiceContent {
    documentId
    title
    description
    duration
    type
    pictureClassnames
    service {
      ...ServiceRelationFields
    }
    site {
      ...SiteFields
    }
  }
`;

/**
 * GraphQL фрагмент для получения полного набора полей контента сервиса
 *
 * @typedef {Object} Strapi_ServiceContent
 * @property {number} price - Исходная цена сервиса
 * @property {number} discount - Размер скидки
 * @property {number} finalPrice - Конечная цена с учетом скидки
 * @property {string} unit - Единица измерения
 * @property {number} percentageDiscount - Процент скидки
 * @property {Strapi_UploadFile} picture - Изображение сервиса
 * @property {Strapi_ComponentPriceListPriceListItem[]} priceList - Список цен
 * @property {string} pictureClassnames - CSS классы для изображения
 * @extends {Strapi_ServiceContentBase}
 */
export const serviceContentFields = graphql`
  fragment ServiceContentFields on Strapi_ServiceContent {
    ...ServiceContentBaseFields
    price
    discount
    finalPrice
    unit
    percentageDiscount
    picture {
      ...ServiceImageFields
    }
    priceList {
      ...ServicePriceListFields
    }
    pictureClassnames
  }
`;