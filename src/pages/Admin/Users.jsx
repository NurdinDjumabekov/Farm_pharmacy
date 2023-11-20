import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import UsersList from "../../components/UsersPage/UsersPage"


const Users = () =>
{
    const navigate = useNavigate()
    const [showUsers, setShowUsers] = useState(false)
    const { users } = useSelector(state => state.usersReducer)
    return (
        <div>
            <button onClick={() => navigate(-1)}>Назад</button>
            <h2>Users page</h2>
            <button onClick={() => setShowUsers(!showUsers)}>{showUsers ? 'Свернуть Пользователей' : 'Показать Пользователей'}</button>
            {showUsers && (users.length > 0 ? <UsersList users={users} /> : <p>Пользователей нету</p>)}
        </div>
    )
}

export default Users