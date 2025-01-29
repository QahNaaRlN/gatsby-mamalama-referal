import {useState, useEffect} from 'react';

interface UseProcessDataResult<T> {
    data: T[];
    error: Error | null;
    loading: boolean;
}

interface SiteData {
  site: {
    domain: string;
  };
}

export const useProcessData = <T, R extends SiteData = SiteData>(
    rawData: R[],
    validate: (data: R) => T,
    domain?: string
): UseProcessDataResult<T> => {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    try {
      console.log('Raw data before validation:', rawData);

      const filteredData = domain
          ? rawData.filter((item) => item.site.domain === domain)
          : rawData;

      const validatedData = filteredData.map((item) => validate(item));
      console.log('Validated data:', validatedData);
      setData(validatedData);
      setError(null);
    } catch (err) {
      console.error('Validation error:', err);
      setError(err instanceof Error ? err : new Error('Неизвестная ошибка при обработке данных'));
    } finally {
      setLoading(false);
    }
  }, [rawData, validate, domain]);

  return { data, error, loading };
};
