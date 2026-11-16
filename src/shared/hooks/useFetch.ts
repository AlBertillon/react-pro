import { useCallback, useEffect, useRef, useState } from "react";

/** Опции useFetch */
export interface UseFetchOptions {
  /** Запускать ли запрос при монтировании */
  enabled?: boolean;
  /** Триггеры перезапуска */
  deps?: unknown[];
}

/** Результат useFetch */
export interface UseFetchResult<T> {
  /** Загруженные данные */
  data: T | null;
  /** Загружаются ли данные */
  isLoading: boolean;
  /** Ошибка запроса */
  error: Error | null;
  /** Повторный запрос */
  refetch: () => Promise<void>;
  /** Сброс состояния */
  reset: () => void;
}

/**
 * Универсальный хук для GET-запросов.
 * - Отменяет устаревшие запросы (race condition safe)
 * - Не обновляет state после размонтирования
 * - refetch для ручного повтора, deps для автоперезапуска
 */
export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  { enabled = true, deps = [] }: UseFetchOptions = {},
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<Error | null>(null);

  const ref = useRef({ fetcher, mounted: true });
  ref.current.fetcher = fetcher;

  useEffect(() => {
    ref.current.mounted = true;
    return () => {
      ref.current.mounted = false;
    };
  }, []);

  const abortRef = useRef<AbortController | null>(null);

  const execute = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const result = await ref.current.fetcher(controller.signal);
      if (controller.signal.aborted || !ref.current.mounted) return;
      setData(result);
    } catch (err) {
      if (controller.signal.aborted || !ref.current.mounted) return;
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      if (!controller.signal.aborted && ref.current.mounted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }
    execute();
  }, [enabled, ...deps]);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { data, isLoading, error, refetch: execute, reset };
}