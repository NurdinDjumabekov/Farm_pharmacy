import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BooksList from "../../components/BooksList"
import AutorsList from "../../components/AutorsList"

const Books = () =>
{
    const navigate = useNavigate()
    const [showBooks, setShowBooks] = useState(false)
    const [showAutors, setShowAutors] = useState(false)

    const { books } = useSelector(state => state.bookReducer)
    const { authors } = useSelector(state => state.authorsReducer)


    return (
        <div>
            <button onClick={() => navigate(-1)}>Назад</button>
            <h2>Books</h2>
            <button onClick={() => setShowBooks(!showBooks)}>{showBooks ? 'Свернуть Книги' : 'Показать Книги'}</button>
            {showBooks && (books.length > 0 ? <BooksList list={books} aut={authors} /> : <p>Книг нету</p>)}
            <button onClick={() => setShowAutors(!showAutors)}>{showAutors ? 'Свернуть Авторов' : 'Показать Авторов'}</button>
            {showAutors && (authors.length > 0 ? <AutorsList list={authors} /> : <p>Авторов нету</p>)}
        </div>
    )
}

export default Books