/**
 * Интерфейс промо-формы регистрации
 * @interface RegFormPromo
 */
export interface RegFormPromo {
  /** Идентификатор документа */
  documentId: string;
  /** Заголовок формы */
  title: string;
  /** Подзаголовок формы */
  subtitle?: string;
  /** Описание в формате rich text */
  description?: object;
  /** Связанная промо-форма */
  registrationFormPromo: {
    /** Идентификатор документа промо-формы */
    documentId: string;
  };
  /** Информация о сайте */
  site: {
    /** Домен сайта */
    domain: string;
    /** Название сайта */
    siteName: string;
    /** Размер скидки */
    discount: string;
  };
}

/**
 * Интерфейс формы успешной регистрации
 * @interface RegFormSuccess
 */
export interface RegFormSuccess {
  /** Идентификатор документа */
  documentId: string;
  /** Заголовок сообщения */
  title: string;
  /** Подзаголовок сообщения */
  subtitle?: string;
  /** Описание в формате rich text */
  description?: object;
  /** Ссылка для перехода */
  link?: string;
  /** Связанная форма успешной регистрации */
  registrationFormSuccess: {
    /** Идентификатор документа */
    documentId: string;
  };
  /** Информация о сайте */
  site: {
    /** Домен сайта */
    domain: string;
    /** Название сайта */
    siteName: string;
    /** Размер скидки */
    discount: string;
  };
}

/**
 * Интерфейс данных формы регистрации
 * @interface RegistrationFormData
 */
export interface RegistrationFormData {
  /** Номер телефона */
  phoneNumber: string;
  /** Полное имя пользователя */
  fullName: string;
  /** Данные о принятии оферты */
  offer: {
    /** Флаг принятия оферты */
    acceptedOffer: boolean;
    /** Версия оферты */
    offerVersion: number;
    /** Название оферты */
    offerName: string;
    /** Время принятия оферты */
    offerAcceptanceTime: Date;
    /** URL страницы, где была принята оферта */
    websiteAddressRorAcceptingOffer: string;
  };
}

/**
 * Интерфейс ответа на запрос регистрации
 * @interface RegistrationResponse
 */
export interface RegistrationResponse {
  /** Флаг успешности операции */
  success: boolean;
  /** Сообщение о результате */
  message: string;
  /** Дополнительные данные */
  data?: {
    /** Идентификатор отслеживания */
    trackId: string;
    /** Название провайдера реферальной программы */
    referralProgramProviderName: string;
  };
}

/**
 * Интерфейс данных верификации
 * @interface VerificationData
 */
export interface VerificationData {
  /** Код подтверждения */
  code: string;
  /** Номер телефона */
  phoneNumber: string;
}