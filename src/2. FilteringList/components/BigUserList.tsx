import type { USER_DATA } from "../../utils/generateLargeUserList";

const BigUserList = ({users} : {users: typeof USER_DATA}) => {
    return (
        <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.role}
            </li>
          ))
        ) : (
          <li>No user found</li>
        )}
      </ul>
    )
}

export default BigUserList;