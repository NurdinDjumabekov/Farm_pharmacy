import { useEffect, useState } from "react"
import { getBooks } from "../redux/slices/bookSlice"
import { booksApi } from "../api/bookApis"
import { useDispatch, useSelector } from "react-redux"
import BooksList from "../components/BooksList"
import { getAuthors } from "../redux/slices/authorsSlice"
import { authorsApi } from "../api/authorApis"
import AutorsList from "../components/AutorsList"
import { getUsers } from "../redux/slices/usersSlice"
import { usersApi } from "../api/usersApis"
import UsersPage from "../components/UsersPage/UsersPage"
import logo from '../../public/logo.png'

const SaleModerator = () =>
{
    const dispatch = useDispatch()

    const [showBooks, setShowBooks] = useState(false)
    const [showAutors, setShowAutors] = useState(false)
    const [showUsers, setShowUsers] = useState(false)
    const { books } = useSelector(state => state.bookReducer)
    const { authors } = useSelector(state => state.authorsReducer)
    const { users } = useSelector(state => state.usersReducer)

    useEffect(() =>
    {
        dispatch(getBooks(booksApi))
        dispatch(getAuthors(authorsApi))
        dispatch(getUsers(usersApi))
    }, [])
    return (
        <div>
            <div><img src={logo} alt="img" /></div>
            <h2>Saler Page</h2>
            <button onClick={() => setShowBooks(!showBooks)}>{showBooks ? 'Свернуть Книги' : 'Показать Книги'}</button>
            {showBooks && (books.length > 0 ? <BooksList list={books} aut={authors} /> : <p>Книг нету</p>)}
            <button onClick={() => setShowAutors(!showAutors)}>{showAutors ? 'Свернуть Авторов' : 'Показать Авторов'}</button>
            {showAutors && (authors.length > 0 ? <AutorsList list={authors} /> : <p>Авторов нету</p>)}
            <button onClick={() => setShowUsers(!showUsers)}>{showUsers ? 'Свернуть Пользователей' : 'Показать Пользователей'}</button>
            {showUsers && (authors.length > 0 ? <UsersPage users={users} /> : <p>Пользователей нету</p>)}
            <button>Жанры</button>
            <button>Издатели</button>
            <button>Комменты</button>
        </div>
    )
}

export default SaleModerator