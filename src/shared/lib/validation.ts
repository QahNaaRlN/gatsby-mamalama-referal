/**
 * @fileoverview Общие функции валидации, которые могут использоваться в разных частях приложения.
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Проверяет, что объект существует и является объектом.
 */
export const validateIsObject = (entity: unknown, entityName: string): void => {
  if (!entity || typeof entity !== 'object') {
    throw new ValidationError(`${entityName} must be an object`);
  }
};

/**
 * Проверяет, что значение является строкой (если оно предоставлено).
 */
export const validateStringField = (value: unknown, fieldName: string): void => {
  if (value !== undefined && typeof value !== 'string') {
    throw new ValidationError(`${fieldName} must be a string if provided`);
  }
};

/**
 * Проверяет, что значение является числом (если оно предоставлено).
 */
export const validateNumberField = (value: unknown, fieldName: string): void => {
  if (value !== undefined && typeof value !== 'number') {
    throw new ValidationError(`${fieldName} must be a number if provided`);
  }
};

/**
 * Проверяет, что значение является массивом (если оно предоставлено).
 */
export const validateArrayField = (value: unknown, fieldName: string): void => {
  if (value !== undefined && !Array.isArray(value)) {
    throw new ValidationError(`${fieldName} must be an array if provided`);
  }
};