import { useMemo } from "react";

interface UseProcessDataResult<T> {
  data: T[];
  error: Error | null;
  loading: boolean;
}

interface RawDataItem<T> {
  documentId: string;
  site?: {
    domain: string;
    siteName: string;
  };
  additionalData: T;
}

export const useProcessData = <T>(
  rawData: RawDataItem<T>[],
  validate: (data: T) => T,
  domain?: string
): UseProcessDataResult<T> => {
  return useMemo(() => {
    try {
      const filteredData = domain
        ? rawData.filter((item) => item.site?.domain === domain)
        : rawData;

      const validatedData = filteredData.map((item) => validate(item.additionalData));

      return {
        data: validatedData,
        error: null,
        loading: false
      };
    } catch (err) {
      return {
        data: [],
        error: err instanceof Error ? err : new Error("Неизвестная ошибка при обработке данных"),
        loading: false
      };
    }
  }, [rawData, validate, domain]); // Теперь зависимости без мемоизированных функций
};
