import { createContext, useState } from 'react';

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [fiteredBooks, setFilteredBooks] = useState([]);
    const [update, setUpdate] = useState(0);
  
    return (
      <BooksContext.Provider value={{ books, setBooks, fiteredBooks, setFilteredBooks, update, setUpdate }}>
        {children}
      </BooksContext.Provider>
    );
  };

BooksContext.displayName = 'BooksContext';

export default BooksContext;