import { useCallback, useRef } from 'react';

interface CacheItem<V> {
  value: V;
  expiry?: number;
}

const useTTLCache = <K, V>(defaultTTLMs: number) => {
  const cacheRef = useRef<Map<K, CacheItem<V>>>(new Map());

  const get = useCallback((key: K): V | undefined => {
    const cache = cacheRef.current;
    const item = cache.get(key);
    if (!item) return undefined;

    if (item.expiry && Date.now() > item.expiry) {
      cache.delete(key);
      return undefined;
    }

    return item.value;
  }, []);

  const set = useCallback(
    (key: K, value: V, ttlMs: number = defaultTTLMs) => {
      const expiry = Date.now() + ttlMs;
      cacheRef.current.set(key, { value, expiry });
    },
    [defaultTTLMs],
  );

  const remove = useCallback((key: K) => {
    cacheRef.current.delete(key);
  }, []);

  const clear = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  return { get, set, remove, clear };
};

export default useTTLCache;
