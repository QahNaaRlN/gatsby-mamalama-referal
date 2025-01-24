import { useState, useEffect } from 'react';

interface UseProcessDataResult<T> {
  data: T[];
  error: Error | null;
  loading: boolean;
}

export const useProcessData = <T>(
  rawData: unknown[],
  validate: (data: unknown) => T
): UseProcessDataResult<T> => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    try {
      console.log('Raw data before validation:', rawData); // Логируем данные до валидации
      const validatedData = rawData.map((item) => validate(item));
      console.log('Validated data:', validatedData); // Логируем данные после валидации
      setData(validatedData);
      setError(null);
    } catch (err) {
      console.error('Validation error:', err); // Логируем ошибку валидации
      setError(err instanceof Error ? err : new Error('Неизвестная ошибка при обработке данных'));
    } finally {
      setLoading(false);
    }
  }, [rawData, validate]);

  return { data, error, loading };
};