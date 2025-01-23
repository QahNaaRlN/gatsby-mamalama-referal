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
 * Фрагмент базовых полей сервиса
 */
export const serviceBaseFields = graphql`
  fragment ServiceBaseFields on Strapi_Service {
    documentId
    title
    description
    duration
    type
    pictureClassnames
  }
`;

/**
 * Фрагмент полного сервиса, включающий все возможные поля
 */
export const serviceFields = graphql`
  fragment ServiceFields on Strapi_Service {
    ...ServiceBaseFields
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