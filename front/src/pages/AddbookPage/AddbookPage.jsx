import { useEffect, useState } from 'react';
import AddbookForm from '../../Components/Forms/AddbookForm/AddbookForm';
import './AddbookPage.css';
import { toast } from 'react-toastify';
import { getAllBooks } from '../../services/get';
import ProfileBookCard from '../../Components/ProfileBookCard/ProfileBookCard';

function AddbookPage () {
    const[books, setBooks] = useState([]);
    const[update, setUpdate] = useState(0);
    const[updateBook, setUpdateBook] = useState("");
    const[ page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageClick = (pageNumber) => {
      setPage(pageNumber);
    };

    useEffect(() => {
       const getBooks = async () => {
         try{
          const bo = await getAllBooks(page);
          setBooks(bo.books);
          setTotalPages(bo.totalPages);
         }catch(error){
           toast.error(error.message);
         }
       };
       getBooks();
    }, [update, page]);

    return(<>
    <div className="addbook-page-buttons">
       <button type="button" className="btn btn-primary" onClick={() => {
        setUpdateBook("");
        setUpdate((prev) => prev + 1);
       }}>Add new book</button>
    </div>
    <div>
        {!updateBook && <AddbookForm setUpdate={setUpdate}/>}
        {updateBook && <AddbookForm book={updateBook} setUpdate={setUpdate}/>}
    </div>
    <div className='book-list'>
        {books.map((book, index) => {
          return <ProfileBookCard key={index} book={book} setUpdate={setUpdate} setUpdateBook={setUpdateBook}/>
        })}
    </div>
    <div className="pagination-content m-3">
        <ul className="pagination pagination-ul">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${page === index ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageClick(index)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    <div className='book-page-footer'>

    </div>
    </>);
}

export default AddbookPage;