import { useEffect } from "react"
import { getBooks } from "../redux/slices/bookSlice"
import { booksApi } from "../api/bookApis"
import { useDispatch } from "react-redux"
import { getAuthors } from "../redux/slices/authorsSlice"
import { authorsApi } from "../api/authorApis"
import { getUsers } from "../redux/slices/usersSlice"
import { usersApi } from "../api/usersApis"
import { NavLink } from "react-router-dom"

const AdminPage = () =>
{
    const dispatch = useDispatch()

    useEffect(() =>
    {
        dispatch(getBooks(booksApi))
        dispatch(getAuthors(authorsApi))
        dispatch(getUsers(usersApi))
    }, [])
    return (
        <div className="adminPage">
            <h2>Admin page</h2>
            <div className="categories">
                <div className="usersBlok">
                    <h2>Аутентификация</h2>
                    <NavLink to={'/admin/users'}>Пользователи</NavLink>
                    <NavLink to={'/admin/agreements'}>Соглашения</NavLink>
                </div>
                <div className="booksBlok">
                    <h2>Библиотека</h2>
                    <NavLink to={'/admin/authors'}>Авторы</NavLink>
                    <NavLink to={'/admin/books'}>Книги</NavLink>
                    <NavLink to={'/admin/janrs'}>Жанры</NavLink>
                    <NavLink to={'/admin/comments'}>Комментарии</NavLink>

                </div>
                <div className="ordersBlok">
                    <h2>Заказы</h2>
                    <NavLink to={'/admin/orders'}>Заказы</NavLink>
                    <NavLink to={'/admin/receipts'}>Поступления</NavLink>
                </div>
                <div className="accesBlok">
                    <h2>Доступы и ограничения</h2>
                </div>
            </div>
        </div>
    )
}

export default AdminPage