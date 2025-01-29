export interface ConditionBase {
  documentId: string;
  title: string;
  description: object;
  isActive: boolean;
  condition: {
    id: string;
  };
  site: {
    domain: string;
    siteName: string;
  };
}

/** Пропсы для компонента карточки условий */
export interface ConditionsCardProps {
  /** Данные условий */
  conditions: ConditionBase;
}
