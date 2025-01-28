export interface ConditionBase {
  documentId: string;
  title: string;
  description: object;
  isActive: boolean;
}

/** Пропсы для компонента карточки условий */
export interface ConditionsCardProps {
  /** Данные условий */
  conditions: ConditionBase;
}