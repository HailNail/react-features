import React, { useMemo } from "react"
import useLocalStorage from "./useLocalStorage";
import { USER_DATA } from "../2. FilteringList/UserListFilterClassExpanded";
import useDebounce from "./useDebounce";

const useFilterList = () => {
    const [inputValue, setInputValue] = useLocalStorage("search_term", "", 300);

    const debounced = useDebounce(inputValue, 500);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const filteredUsers = useMemo(() => {
        const query = debounced.toLocaleLowerCase().trim();
        return USER_DATA.filter((user) => 
        user.name.toLocaleLowerCase().includes(query) ||
        user.role.toLocaleLowerCase().includes(query)
    )
    }, [debounced]);

    return {inputValue, handleSearchChange, filteredUsers}
}

export default useFilterList;