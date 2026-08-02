import React, { useDeferredValue, useMemo, useState } from 'react';
import useLocalStorage from './useLocalStorage';
import { USER_DATA } from '../utils/generateLargeUserList';

const ITEMS_FOR_PAGE = 50;

const useFilterListWithPagination = () => {
  const [inputValue, setInputValue] = useLocalStorage('search_term', '', 300);
  const [page, setPage] = useState(1);

  const deferred = useDeferredValue(inputValue);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setPage(1);
  };

  const filteredUsers = useMemo(() => {
    const query = deferred.toLocaleLowerCase().trim();
    return USER_DATA.filter(
      (user) =>
        user.name.toLocaleLowerCase().includes(query) ||
        user.role.toLocaleLowerCase().includes(query),
    );
  }, [deferred]);

  const paginatedUsers = useMemo(() => {
    const staerIndex = (page - 1) * ITEMS_FOR_PAGE;
    return filteredUsers.slice(staerIndex, staerIndex + ITEMS_FOR_PAGE)
  }, [filteredUsers, page]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_FOR_PAGE);

  return { inputValue, page, setPage, handleSearchChange, paginatedUsers, totalPages };
};

export default useFilterListWithPagination;
