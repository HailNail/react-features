import React, { Component } from "react";

const USER_DATA = [
    {id: 1, name: "Alice Smith", role: "Frontend Developer"},
    {id: 2, name: "Bob Ferny", role: "UI/UX Designer"},
    {id: 3, name: "Charlie Scene", role: "Product Manager"},
    {id: 4, name: "Diana Prince", role: "DevOps"},
    {id: 5, name: "Ethan Layer", role: "Backend Developer"},
];

class UserListFilterClass extends Component {

    state: Readonly<{searchTerm: string}> = {
        searchTerm: ""
    };

    handleSearchChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchTerm: event.target.value
        });
    }

    render(): React.ReactNode {
        const {searchTerm} = this.state;
        const filteredUsers = USER_DATA.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );

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
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
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

export default UserListFilterClass;