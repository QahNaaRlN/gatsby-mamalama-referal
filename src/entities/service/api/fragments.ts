/**
 * @fileoverview GraphQL фрагменты для запроса данных сервисов из Strapi через настроенный источник данных
 */

import { graphql } from "gatsby";

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
  fragment SiteFields on Strapi_Site {
    domain
    siteName
  }
`;

/**
 * Фрагмент для связанного базового Service
 */
export const serviceRelationFields = graphql`
  fragment ServiceRelationFields on Strapi_Service {
    slug
  }
`;

/**
 * Фрагмент базовых полей сервиса
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
 * Фрагмент полного контента сервиса
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
