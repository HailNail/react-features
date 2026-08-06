import React, { useDeferredValue, useMemo } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import type { ToRecord } from '../../types/MiddleTypes';

const useFilterList = <T extends ToRecord<T>>(
  items: T[],
  searchKeys: (keyof T)[],
) => {
  const [inputValue, setInputValue] = useLocalStorage('search_term', '', 300);
  const deferred = useDeferredValue(inputValue);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const keyDependency = searchKeys.join(',');

  const filteredItems = useMemo(() => {
    console.log('Hell');
    const query = deferred.toLocaleLowerCase().trim();
    if (!query) return items;
    const keys = keyDependency.split(',') as (keyof T)[];
    return items.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        return (
          value !== null && String(value).toLocaleLowerCase().includes(query)
        );
      }),
    );
  }, [deferred, items, keyDependency]);

  return { inputValue, handleSearchChange, filteredItems };
};

export default useFilterList;
