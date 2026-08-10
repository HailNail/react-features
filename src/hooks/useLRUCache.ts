import { useCallback, useRef } from "react"

const useLRUCache = <K, V>(capacity : number) => {
    const cacheRef = useRef<Map<K, V>>(new Map());

    const get = useCallback((key: K) : V | undefined => {
        const cache = cacheRef.current;
        if (!cache.has(key)) return undefined;

        const value = cache.get(key) as V;

        cache.delete(key);
        cache.set(key, value);

        return value
    }, []);

    const set = useCallback((key: K, value: V) => {
        const cache = cacheRef.current;
        if (cache.has(key)) {
            cache.delete(key);
        } else if (cache.size >= capacity) {
            const oldestKey = cache.keys().next().value;

            if (oldestKey !== undefined) {
                cache.delete(oldestKey);
            }
        }

        cache.set(key, value);
    }, [capacity]);

    const has = useCallback((key : K) : boolean => {
        return cacheRef.current.has(key);
    }, []);

    const clear = useCallback(() => {
        cacheRef.current.clear();
    }, []);

    return {get, set, has, clear}
}

export default useLRUCache;