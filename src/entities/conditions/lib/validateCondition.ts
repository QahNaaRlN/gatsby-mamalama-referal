import { ValidationError } from "yup";

import { Condition } from "@entities/conditions";

/**
 * Функция валидации объекта условия
 * @param {unknown} condition - Проверяемый объект условия
 * @throws {ValidationError} Если объект не соответствует требованиям
 * @returns {Condition} Валидированный объект условия
 */
export const validateCondition = (condition: unknown): Condition => {
  if (!condition || typeof condition !== 'object') {
    throw new ValidationError('Condition must be an object');
  }

  const c = condition as Partial<Condition>;

  if (!c.documentId) {
    throw new ValidationError('Condition must have a documentId');
  }
  if (!c.title) {
    throw new ValidationError('Condition must have a title');
  }
  if (!c.description) {
    throw new ValidationError('Condition must have a description');
  }
  if (c.isActive === undefined || c.isActive === null) {
    throw new ValidationError('Condition must have an isActive flag');
  }

  return c as Condition;
};