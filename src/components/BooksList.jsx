import { useSelector } from "react-redux"
import BookCard from "./BookCard"

const BooksList = ({ list, aut }) =>
{
    return (
        <div>
            {list.map(book => <BookCard data={book} autor={aut.find(el => el.id === book.author)} key={book.id} />)}
        </div>
    )
}

export default BooksList