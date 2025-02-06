/**
 * @fileoverview Публичный API модуля сервисов
 *
 * @description
 * Модуль экспортирует:
 *
 * Константы:
 * - CURRENCY - валюта для отображения цен
 * - DEFAULT_DURATION_DAYS - длительность услуги по умолчанию
 *
 * Типы:
 * - ServiceType - тип для определения вида сервиса
 * - UploadFile - интерфейс загруженного файла
 * - StandardService - интерфейс стандартного сервиса
 * - SpecialService - интерфейс специального сервиса
 * - Service - объединенный тип сервиса
 * - StandardCardProps - пропсы компонента стандартной карточки
 * - SpecialCardProps - пропсы компонента специальной карточки
 *
 * Функции:
 * - isSpecialService - проверка на специальный сервис
 * - isStandardService - проверка на стандартный сервис
 */

export { CURRENCY, DEFAULT_DURATION_DAYS } from "./consts";
export type { ServiceType } from "./consts";
export { isSpecialService, isStandardService } from "./guards";
export type { UploadFile, StandardService, SpecialService, Service, StandardCardProps, SpecialCardProps } from "./types";