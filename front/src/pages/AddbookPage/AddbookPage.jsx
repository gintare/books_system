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

    useEffect(() => {
       const getBooks = async () => {
         try{
          const bo = await getAllBooks();
          setBooks(bo);
         }catch(error){
           toast.error(error.message);
         }
       };
       getBooks();
    }, [update]);

    return(<>
    <div className="addbook-page-buttons">
       <button type="button" class="btn btn-primary" onClick={() => {
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
    <div className='book-page-footer'>

    </div>
    </>);
}

export default AddbookPage;