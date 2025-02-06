/**
 * @fileoverview Определения типов для сервисов и связанных сущностей в Strapi 5
 */

import { type ServiceType as ServiceTypeEnum } from './consts';

/**
 * Интерфейс для файла загрузки
 *
 * @interface UploadFile
 * @description
 * Описывает структуру файла, загруженного через Strapi Media Library
 *
 * @property {Record<string, unknown>} formats - Форматы изображения (thumbnail, small, medium, large)
 * @property {string} name - Имя файла
 * @property {string} mime - MIME-тип файла (например, "image/jpeg")
 * @property {number} size - Размер файла в байтах
 * @property {string} url - URL файла для доступа
 * @property {number} width - Ширина изображения в пикселях
 * @property {number} height - Высота изображения в пикселях
 * @property {string} alternativeText - Альтернативный текст для изображения
 */
export interface UploadFile {
  formats: Record<string, unknown>;
  name: string;
  mime: string;
  size: number;
  url: string;
  width: number;
  height: number;
  alternativeText: string;
}

/**
 * Интерфейс для элемента прайс-листа
 *
 * @interface PriceListItem
 * @description
 * Описывает структуру отдельной позиции в прайс-листе специального сервиса
 *
 * @property {string} id - Идентификатор элемента
 * @property {string} title - Название услуги
 * @property {number} price - Базовая цена до скидки
 * @property {number} [discount] - Размер скидки в валюте (опционально)
 * @property {number} finalPrice - Финальная цена с учетом скидки
 * @property {string} [unit] - Единица измерения (например, "шт", "м²")
 */
export interface PriceListItem {
  id: string;
  title: string;
  price: number;
  discount?: number;
  finalPrice: number;
  unit?: string;
}

/**
 * Базовый интерфейс сервиса с общими полями
 *
 * @interface ServiceBase
 * @description
 * Описывает общие поля для всех типов сервисов
 *
 * @property {string} documentId - Уникальный идентификатор документа в Strapi
 * @property {string} title - Название сервиса
 * @property {object} description - Описание сервиса в формате rich text
 * @property {number} duration - Длительность выполнения в днях
 * @property {ServiceTypeEnum} type - Тип сервиса (standard или special)
 * @property {object} site - Информация о сайте
 * @property {string} site.domain - Домен сайта
 * @property {string} site.siteName - Название сайта
 */
interface ServiceBase {
  documentId: string;
  title: string;
  description: object;
  duration: number;
  type: ServiceTypeEnum;
  site: {
    domain: string;
    siteName: string;
  };
}

/**
 * Интерфейс стандартного сервиса
 *
 * @interface StandardService
 * @description
 * Описывает сервис с фиксированной ценой
 *
 * @extends {ServiceBase}
 * @property {number} price - Базовая цена сервиса
 * @property {number} [discount] - Размер скидки в валюте
 * @property {number} [percentageDiscount] - Процент скидки
 * @property {number} finalPrice - Финальная цена с учетом скидки
 * @property {string} [unit] - Единица измерения
 * @property {UploadFile} picture - Изображение сервиса
 * @property {string} [pictureClassnames] - CSS классы для стилизации изображения
 */
export interface StandardService extends ServiceBase {
  price: number;
  discount?: number;
  percentageDiscount?: number;
  finalPrice: number;
  unit?: string;
  picture: UploadFile;
  pictureClassnames?: string;
}

/**
 * Интерфейс специального сервиса
 *
 * @interface SpecialService
 * @description
 * Описывает сервис с несколькими вариантами цен
 *
 * @extends {ServiceBase}
 * @property {PriceListItem[]} priceList - Массив вариантов цен
 * @property {UploadFile} picture - Изображение сервиса
 * @property {string} [pictureClassnames] - CSS классы для стилизации изображения
 */
export interface SpecialService extends ServiceBase {
  priceList: PriceListItem[];
  picture: UploadFile;
  pictureClassnames?: string;
}

/**
 * Объединенный тип сервиса
 *
 * @typedef {StandardService | SpecialService} Service
 * @description
 * Union тип, представляющий все возможные варианты сервиса
 */
export type Service = StandardService | SpecialService;

/**
 * Пропсы для компонента стандартной карточки
 *
 * @interface StandardCardProps
 * @description
 * Пропсы для компонента, отображающего карточку стандартного сервиса
 *
 * @property {StandardService} service - Данные стандартного сервиса
 */
export interface StandardCardProps {
  service: StandardService;
}

/**
 * Пропсы для компонента специальной карточки
 *
 * @interface SpecialCardProps
 * @description
 * Пропсы для компонента, отображающего карточку специального сервиса
 *
 * @property {SpecialService} service - Данные специального сервиса
 */
export interface SpecialCardProps {
  service: SpecialService;
}