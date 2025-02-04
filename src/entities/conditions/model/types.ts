/**
 * Базовый интерфейс условия
 * @interface ConditionBase
 */
export interface ConditionBase {
  /** Идентификатор документа */
  documentId: string;
  /** Заголовок условия */
  title: string;
  /** Описание условия */
  description: object;
  /** Флаг активности */
  isActive: boolean;
  /** Связанное условие */
  condition: {
    /** Идентификатор документа условия */
    documentId: string;
  };
  /** Информация о сайте */
  site: {
    /** Домен сайта */
    domain: string;
    /** Название сайта */
    siteName: string;
  };
}

/**
 * Пропсы для компонента карточки условий
 * @interface ConditionsCardProps
 */
export interface ConditionsCardProps {
  /** Данные условий */
  conditions: ConditionBase;
}