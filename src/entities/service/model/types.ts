/**
 * @fileoverview Определения типов для сервисов и связанных сущностей в Strapi 5
 */

import { type ServiceType as ServiceTypeEnum } from './consts';

/**
 * Интерфейс для файла загрузки
 */
export interface UploadFile {
  /** Форматы изображения */
  formats: Record<string, unknown>;
  /** Имя файла */
  name: string;
  /** MIME-тип файла */
  mime: string;
  /** Размер файла */
  size: number;
  /** URL файла */
  url: string;
  /** Ширина изображения */
  width: number;
  /** Высота изображения */
  height: number;
  /** Альтернатиыный текст */
  alternativeText: string
}

/**
 * Интерфейс для элемента прайс-листа
 */
export interface PriceListItem {
  /** Идентификатор элемента */
  id: string;
  /** Название услуги */
  title: string;
  /** Базовая цена */
  price: number;
  /** Скидка (опционально) */
  discount?: number;
  /** Финальная цена с учетом скидки */
  finalPrice: number;
  /** Единица измерения (опционально) */
  unit?: string;
}

/**
 * Базовый интерфейс сервиса с общими полями
 */
interface ServiceBase {
  /** Идентификатор документа */
  documentId: string;
  /** Название сервиса */
  title: string;
  /** Описание сервиса */
  description: string;
  /** Длительность в днях */
  duration: number;
  /** Тип сервиса */
  type: ServiceTypeEnum;
}

/**
 * Интерфейс стандартного сервиса
 */
export interface StandardService extends ServiceBase {
  /** Базовая цена */
  price: number;
  /** Скидка */
  discount?: number;
  /** Процент скидки */
  percentageDiscount?: number;
  /** Финальная цена */
  finalPrice: number;
  /** Единица измерения */
  unit?: string;
  /** Изображение сервиса */
  picture: UploadFile;
  /** Дополнительные классы для изображения */
  pictureClassnames?: string;
}

/**
 * Интерфейс специального сервиса
 */
export interface SpecialService extends ServiceBase {
  /** Список цен */
  priceList: PriceListItem[];
  /** Изображение сервиса */
  picture: UploadFile;
  /** Дополнительные классы для изображения */
  pictureClassnames?: string;
}

/** Объединенный тип сервиса */
export type Service = StandardService | SpecialService;

/** Пропсы для компонента стандартной карточки */
export interface StandardCardProps {
  /** Данные сервиса */
  service: StandardService;
}

/** Пропсы для компонента специальной карточки */
export interface SpecialCardProps {
  /** Данные сервиса */
  service: SpecialService;
}