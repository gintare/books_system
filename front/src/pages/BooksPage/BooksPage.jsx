import { useContext, useEffect, useState } from "react";
import "./BooksPage.css";
import { toast } from "react-toastify";
import { getAllBooks } from "../../services/get";
import BookCard from "../../Components/BookCard/BookCard";
import BooksContext from '../../Context/BooksContext/BooksContext';
import CategoriesContext from "../../Context/CategoriesContext/CategoriesContext";

function BooksPage() {
//   const[books, setBooks] = useState([]);
  const{books, setBooks, fiteredBooks, update, setUpdate } = useContext(BooksContext);
  

  useEffect(() => {
    const getBooks = async () => {
      try{
        const bo = await getAllBooks();
        setBooks(bo);
      }catch(error){
        toast.error(error.message);
        console.error(error.message)
      }
    }
    getBooks();
  }, [])

  return(<><h1>Books page</h1>
  <div className='book-list'>
    {fiteredBooks.map((book, index) => {
        return <BookCard key={index} book={book} />
    })}
  </div>
  <div className="books-page-footer">

  </div>
  </>);
}

export default BooksPage;