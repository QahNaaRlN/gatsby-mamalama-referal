import { useMemo } from "react";

interface UseProcessDataResult<T> {
  data: T[];
  error: Error | null;
  loading: boolean;
}

export const useProcessData = <T>(
  data: T[]
): UseProcessDataResult<T> => {
  return useMemo(() => {
    try {
      return {
        data,
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
  }, [data]);
};