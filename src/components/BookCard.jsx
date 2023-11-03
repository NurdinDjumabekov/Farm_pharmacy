import { useSelector } from "react-redux";
import PdfViewer from "./PdfViewer"

const BookCard = ({ data, autor }) =>
{
    const handleDownloadPdf = (pdfUrl) =>
    {
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className="bookCard">
            <h3>{data.name}</h3>
            <div className="avatar"><img src={data.cover_image} alt="img" /></div>
            <p>{data.description?.length > 135 ? (data.description.slice(0, 135) + '...') : data.description}</p>
            <p>Количкство страниц: {data.amount_pages}</p>
            <h4>Автор: {autor.first_name + " " + autor.last_name}</h4>
            <button onClick={() => handleDownloadPdf(data.short_book_file)}>Читать короткую версию</button>
            <button onClick={() => handleDownloadPdf(data.book_file)}>Читать полную версию</button>
            {/* <PdfViewer pdfUrl={data.short_book_file} /> */}
            {/* <div>
                <iframe src={data.short_book_file} frameBorder={0} />
            </div> */}
        </div>
    )
}

export default BookCard