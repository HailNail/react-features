import { useState } from "react";
import useFilterList from "../hooks/useFilterList";

const UserListFilter18v = () => {
    const {inputValue, handleSearchChange, filteredUsers} = useFilterList();
    const displayedUsers = filteredUsers.slice(0, 50);
    const [count, setCount] = useState(0);

    return (
        <div>
            <h2>User directory</h2>
            <p>Child count {count}</p>
            <button type="button" onClick={() => setCount(prev => prev + 1)}>Click</button>
            <input 
            type="text" 
            name="search" 
            id="search"
            placeholder="Search by name and role..."
            value={inputValue}
            onChange={handleSearchChange}
             />
            <ul>
                {displayedUsers.length > 0 ? (
                    displayedUsers.map(user => (
                        <li key={user.id}>{user.name} - {user.role}</li>
                    )) 
                ) : (
                        <li>No user found</li>
                    )}
            </ul>
        </div>
    )
}

export default UserListFilter18v;