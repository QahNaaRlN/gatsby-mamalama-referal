/**
 * @fileoverview GraphQL фрагменты для запроса данных сервисов из Strapi через настроенный источник данных
 */

import { graphql } from 'gatsby';

/**
 * Фрагмент для получения данных изображения
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
 * Фрагмент для элемента прайс-листа
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
 * Фрагмент для связанного Site
 */
export const siteFields = graphql`
  fragment SiteFields on STRAPI__SITE {
    domain
    siteName
  }
`;

/**
 * Фрагмент для связанного базового Service
 */
export const serviceRelationFields = graphql`
  fragment ServiceRelationFields on STRAPI__SERVICE {
    id
    # другие базовые поля Service, если есть
  }
`;

/**
 * Фрагмент базовых полей сервиса
 */
export const serviceContentBaseFields = graphql`
  fragment ServiceContentBaseFields on STRAPI__SERVICE_CONTENT {
    id
    title
    description
    duration
    type
    pictureClassnames
    service {
      data {
        attributes {
          ...ServiceRelationFields
        }
      }
    }
    site {
      data {
        attributes {
          ...SiteFields
        }
      }
    }
  }
`;

/**
 * Фрагмент полного контента сервиса
 */
export const serviceContentFields = graphql`
  fragment ServiceContentFields on STRAPI__SERVICE_CONTENT {
    ...ServiceContentBaseFields
    price
    discount
    finalPrice
    unit
    percentageDiscount
    picture {
      data {
        attributes {
          ...ServiceImageFields
        }
      }
    }
    priceList {
      ...ServicePriceListFields
    }
    pictureClassnames
  }
`;
