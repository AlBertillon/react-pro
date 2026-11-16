import { useEffect, useRef, useState } from "react";

/** Debounce: возвращает значение с задержкой */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<unknown>(value);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [value, delay]);

  return debounced as T;
}
