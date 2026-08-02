import React, { PureComponent } from "react";

interface UserDataForm {
  id: number;
  name: string;
  role: string;
}

const generateLargeUserList = (count: number): UserDataForm[] => {
  const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
  const roles = ["Developer", "Designer", "Manager", "QA Engineer", "DevOps", "Data Scientist", "Admin"];

  const users: UserDataForm[] = [];

  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];

    users.push({
      id: i,
      name: `${firstName} ${lastName}`,
      role: role
    });
  }

  return users;
};

// Генерируем 20 000 пользователей для теста
export const USER_DATA = generateLargeUserList(2000);


class UserListFilterClassExpanded extends PureComponent {
    private searchTimeout : number | null = null;
    private readonly storageKey = "user_search_term";

    private lastSearchTerm = "";
    private memoizedUsers : UserDataForm[] = [];

    state: Readonly<{searchTerm: string, debouncedSearchTerm: string}> = {
        searchTerm: localStorage.getItem(this.storageKey) || "",
        debouncedSearchTerm: localStorage.getItem(this.storageKey) || ""
    };

    private debouncedSaveToStorage = (value: string) => {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(() => {
            this.setState({ debouncedSearchTerm: value })
            try {
                localStorage.setItem(this.storageKey, value);
            } catch (error : unknown) {
                const err = error instanceof Error ? error.message : typeof error === "string" ? error : String(error);
                console.error("Local Storage error", err)
            }
        }, 300)
    }
    
    componentWillUnmount(): void {
        if (this.searchTimeout)  clearTimeout(this.searchTimeout);
    }

    handleSearchChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchTerm: event.target.value
        });

        this.debouncedSaveToStorage(event.target.value);
    }

    private getFilteredUsers = (searchTerm : string) => {

        if (searchTerm === this.lastSearchTerm) {
            return this.memoizedUsers;
        }

        this.memoizedUsers = USER_DATA.filter(user => 
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.role.toLowerCase().includes(searchTerm.toLowerCase())
            );

            this.lastSearchTerm = searchTerm;

              console.timeEnd("⏱️ [ФИЛЬТРАЦИЯ]: Время поиска");

            return this.memoizedUsers;
    }


    render(): React.ReactNode {
        const {searchTerm, debouncedSearchTerm} = this.state;
        const filteredUsers = this.getFilteredUsers(debouncedSearchTerm);
        const displayedUsers = filteredUsers.slice(0, 50);

        return (
            <div>
                <h2>User directory</h2>
                <input 
                type="text" 
                name="search" 
                id="search" 
                value={searchTerm} 
                onChange={this.handleSearchChange} 
                placeholder="Search by name or role..."
                 />
                 <ul>
                    {displayedUsers.length > 0 ? (
                        displayedUsers.map(user => (
                            <li key={user.id}>{user.name} - {user.role}</li>
                        ))
                    ) : (
                        <li>No users found</li>
                    )}
                 </ul>
            </div>
        )
    }
}

export default UserListFilterClassExpanded;