import { useCallback, useRef } from 'react';

interface CacheItem<V> {
  value: V;
  expiry: number | null;
}

const useLRUWithTTLCache = <K, V>(capacity: number, defaultTTLMs?: number) => {
  const cacheRef = useRef<Map<K, CacheItem<V>>>(new Map());

  const get = useCallback((key: K): V | undefined => {
    const cache = cacheRef.current;

    if (!cache.has(key)) return undefined;

    const item = cache.get(key)!;

    if (item?.expiry && Date.now() > item.expiry) {
      cache.delete(key);
      return undefined;
    }

    cache.delete(key);
    cache.set(key, item);

    return item?.value;
  }, []);

  const set = useCallback(
    (key: K, value: V, ttlMs = defaultTTLMs) => {
      const cache = cacheRef.current;

      if (cache.has(key)) {
        cache.delete(key);
      } else if (cache.size >= capacity) {
        const oldestKey = cache.keys().next().value;
        if (oldestKey !== undefined) cache.delete(oldestKey);
      }

      const expiry = ttlMs ? Date.now() + ttlMs : null;

      cache.set(key, { value, expiry });
    },
    [capacity, defaultTTLMs],
  );

  return { get, set };
};

export default useLRUWithTTLCache;
