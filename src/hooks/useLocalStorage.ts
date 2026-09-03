import { useCallback, useEffect, useRef, useState } from 'react';

type Updater<T> = T | ((previous: T) => T);

/**
 * `useState` that transparently persists to `localStorage` and stays in
 * sync across tabs. Safe against unavailable/blocked storage and malformed
 * JSON — it falls back to the initial value and warns instead of throwing.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): readonly [T, (value: Updater<T>) => void] {
  const initialRef = useRef<T>(initialValue);

  const read = useCallback((): T => {
    if (typeof window === 'undefined') return initialRef.current;
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initialRef.current : (JSON.parse(raw) as T);
    } catch (error) {
      console.warn(`useLocalStorage: unable to read "${key}".`, error);
      return initialRef.current;
    }
  }, [key]);

  const [value, setValue] = useState<T>(read);

  const set = useCallback(
    (next: Updater<T>) => {
      setValue((previous) => {
        const resolved =
          typeof next === 'function' ? (next as (p: T) => T)(previous) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch (error) {
          console.warn(`useLocalStorage: unable to write "${key}".`, error);
        }
        return resolved;
      });
    },
    [key],
  );

  useEffect(() => {
    const onStorage = (event: StorageEvent): void => {
      if (event.key === key) setValue(read());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key, read]);

  return [value, set] as const;
}
