import React, { useMemo, useState } from "react"
import useLocalStorage from "./useLocalStorage";
import { USER_DATA } from "../2. FilteringList/UserListFilterClassExpanded";

const useFilterList = () => {
    const [inputValue, setInputValue] = useState("");
    const [delayedValue, setDelayedValue] = useLocalStorage("search_term", "", 300);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setDelayedValue(event.target.value);
    }

    const filteredUsers = useMemo(() => {
        return USER_DATA.filter((user) => 
        user.name.toLocaleLowerCase().includes(delayedValue.toLocaleLowerCase()) ||
        user.role.toLocaleLowerCase().includes(delayedValue.toLocaleLowerCase())
    )
    }, [delayedValue]);

    return {inputValue, delayedValue, handleSearchChange, filteredUsers}
}

export default useFilterList;