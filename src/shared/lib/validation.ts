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
  console.log(`Проверка объекта для ${entityName}:`, entity);
  if (!entity || typeof entity !== 'object') {
    console.error(`${entityName} должен быть объектом`);
    throw new ValidationError(`${entityName} must be an object`);
  }
};

/**
 * Проверяет, что значение является строкой (если оно предоставлено).
 */
export const validateStringField = (value: unknown, fieldName: string): void => {
  console.log(`Проверка строки для поля ${fieldName}:`, value);
  if (value !== undefined && typeof value !== 'string') {
    console.error(`${fieldName} должен быть строкой, если он предоставлен`);
    throw new ValidationError(`${fieldName} must be a string if provided`);
  }
};

/**
 * Проверяет, что значение является числом (если оно предоставлено).
 */
export const validateNumberField = (value: unknown, fieldName: string): void => {
  console.log(`Проверка числа для поля ${fieldName}:`, value);
  if (value !== undefined && typeof value !== 'number') {
    console.error(`${fieldName} должен быть числом, если он предоставлен`);
    throw new ValidationError(`${fieldName} must be a number if provided`);
  }
};

/**
 * Проверяет, что значение является массивом (если оно предоставлено).
 */
export const validateArrayField = (value: unknown, fieldName: string): void => {
  console.log(`Проверка массива для поля ${fieldName}:`, value);
  if (value !== undefined && !Array.isArray(value)) {
    console.error(`${fieldName} должен быть массивом, если он предоставлен`);
    throw new ValidationError(`${fieldName} must be an array if provided`);
  }
};

/**
 * Проверяет, что значение является объектом (для rich text полей).
 */
export const validateRichTextField = (value: unknown, fieldName: string): void => {
  console.log(`Проверка rich text для поля ${fieldName}:`, value);

  // Пропускаем undefined и null значения
  if (value === undefined || value === null) {
    return;
  }

  // Проверяем, что это массив
  if (!Array.isArray(value)) {
    console.error(`${fieldName} должен быть массивом rich text блоков`);
    throw new ValidationError(`${fieldName} must be an array of rich text blocks`);
  }

  // Проверяем структуру каждого элемента
  value.forEach((block, index) => {
    if (!block || typeof block !== 'object' || Array.isArray(block)) {
      console.error(`Блок ${index} в ${fieldName} должен быть объектом`);
      throw new ValidationError(`Block ${index} in ${fieldName} must be an object`);
    }

    if (typeof block.type !== 'string') {
      console.error(`Блок ${index} в ${fieldName} должен иметь строковое поле type`);
      throw new ValidationError(`Block ${index} in ${fieldName} must have a string type field`);
    }

    if (!Array.isArray(block.children)) {
      console.error(`Блок ${index} в ${fieldName} должен иметь массив children`);
      throw new ValidationError(`Block ${index} in ${fieldName} must have a children array`);
    }
  });
};