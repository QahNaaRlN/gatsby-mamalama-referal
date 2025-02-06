/**
 * Базовый интерфейс FAQ
 * @interface FAQ
 */
export interface FAQ {
  /** Идентификатор документа */
  documentId: string;
  /** Текст вопроса */
  question: string;
  /** Текст ответа */
  answer: string;
  /** Связанный FAQ */
  faq: {
    /** Идентификатор документа FAQ */
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