import { useEffect, useState, type Dispatch, type SetStateAction } from "react"

const useLocalStorage = <T>(key : string, initialValue : T, delay : number) : [T, Dispatch<SetStateAction<T>>] => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error : unknown) {
            const err = error instanceof Error ? error.message : (typeof error === "string" ? error : String(error));
            console.error(err);
            return initialValue;
        }
    });

    const [debouncedValue, setDebouncedValue] = useState<T>(storedValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            try {
            localStorage.setItem(key, JSON.stringify(storedValue));
             setDebouncedValue(storedValue);
        } catch (error) {
            const err = error instanceof Error ? error.message : (typeof error === "string" ? error : String(error));
            console.error(err);
        }
        }, delay);
        
        return () => clearTimeout(handler);
    }, [storedValue, key])
       

    return [debouncedValue, setStoredValue];
}

export default useLocalStorage;