import { useState, useTransition } from 'react';
import { USER_DATA } from '../../utils/generateLargeUserList';
import useLocalStorage from '../../helperHooks/useLocalStorage';
import { ITEMS_PER_PAGE } from '../../constants/PAGES';

const useFilterListV19 = () => {
  const [filteredList, setFilteredList] = useState(USER_DATA);
  const [page, setPage] = useLocalStorage('page', 1, 300);
  const [isPending, startTransition] = useTransition();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLocaleLowerCase();
    startTransition(() => {
      const results = USER_DATA.filter(
        (user) =>
          user.name.toLocaleLowerCase().includes(query) ||
          user.role.toLocaleLowerCase().includes(query),
      );

      setFilteredList(results);
      setPage(1);
    });
  };

  const paginatedUsers = filteredList.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return {
    filteredList,
    page,
    setPage,
    isPending,
    handleSearchChange,
    paginatedUsers,
  };
};

export default useFilterListV19;
