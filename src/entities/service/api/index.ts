/**
 * @fileoverview Экспорт GraphQL фрагментов для работы с сервисами в Strapi CMS
 *
 * @description
 * Модуль реэкспортирует GraphQL фрагменты, используемые для запросов данных сервисов:
 * - imageFields - фрагмент для получения данных изображения
 * - priceListItemFields - фрагмент для элементов прайс-листа
 */

export {
  imageFields,
  priceListItemFields,
} from './fragments';