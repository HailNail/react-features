import React, { useDeferredValue, useMemo } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { USER_DATA } from '../../utils/generateLargeUserList';

const useFilterListWithPagination = () => {
  const [inputValue, setInputValue] = useLocalStorage('search_term', '', 300);

  const deferred = useDeferredValue(inputValue);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const filteredUsers = useMemo(() => {
    const query = deferred.toLocaleLowerCase().trim();
    return USER_DATA.filter(
      (user) =>
        user.name.toLocaleLowerCase().includes(query) ||
        user.role.toLocaleLowerCase().includes(query),
    );
  }, [deferred]);

  return { inputValue, handleSearchChange, filteredUsers };
};

export default useFilterListWithPagination;
