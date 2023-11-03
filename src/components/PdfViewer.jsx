import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = '/path/to/pdf.worker.js';
function PdfViewer({ pdfUrl })
{
    console.log(pdfUrl);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) =>
    {
        setNumPages(numPages);
    };

    const handleDownloadPdf = () =>
    {
        window.open(pdfUrl, '_blank');
    };

    return (
        <div>
            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Страница {pageNumber} из {numPages}
            </p>
            <button onClick={handleDownloadPdf}>Скачать PDF</button>
        </div>
    );
}

export default PdfViewer;
