import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserNameFromToken, getUserRoleFromToken } from "../../utils/jwt";

import "./Navigation.css";
import { useContext, useEffect, useState } from "react";
import BooksContext from "../../Context/BooksContext/BooksContext";
import CategoriesContext from "../../Context/CategoriesContext/CategoriesContext";
import { getAllBooks, getAllCategories, getBooksByCategories } from "../../services/get";

const Navigation = () => {
  const [searchText, setSearchText] = useState("");
  const { books, setBooks, setFilteredBooks, update, setUpdate } =
    useContext(BooksContext);
  const { categories, setCategories } = useContext(CategoriesContext);

  //console.log(contextData, "boooooo");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  // const userName = getUserNameFromToken(token);
  const userName = isLoggedIn ? getUserNameFromToken(token) : null;
  const userRole = isLoggedIn ? getUserRoleFromToken(token) : null;

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    toast.success("Logged out!");
    navigate("/login", { replace: true });
  };

  const onCategorySelectChangeHandler = async(e) => {
    try {
      let bo = null;
      if (e.target.value !== '0') {
        bo = await getBooksByCategories(e.target.value);
      } else {
        bo = await getAllBooks();
      }
      if(!bo){
        throw new Error("Operation no success");
      }

      //setBooks(bo);
      setFilteredBooks(bo);
    }catch(error){
      toast.error(error.message);
      console.error(error.message);
    }
  }

  useEffect(() => {
    const filter = books.filter((book) => {
      return book.name.toLowerCase().includes(searchText.toLowerCase());
    });

    setFilteredBooks(filter);
    //setBooks(filter);
    setUpdate((prev) => prev + 1);

    const getCategories = async () => {
      try {
        const cat = await getAllCategories();
        setCategories(cat);
      } catch (error) {
        toast.error(error.message);
        console.error(error.message);
      }
    };
    getCategories();
  }, [searchText, books]);

  return (
    //     <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //   <div className="container-fluid">
    //     <a className="navbar-brand" href="#">Navbar</a>
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <a className="nav-link active" aria-current="page" href="#">Home</a>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link" href="#">Link</a>
    //         </li>
    //         <li className="nav-item dropdown">
    //           <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //             Dropdown
    //           </a>
    //           <ul className="dropdown-menu">
    //             <li><a className="dropdown-item" href="#">Action</a></li>
    //             <li><a className="dropdown-item" href="#">Another action</a></li>
    //             <li><hr className="dropdown-divider"/></li>
    //             <li><a className="dropdown-item" href="#">Something else here</a></li>
    //           </ul>
    //         </li>
    //         <li className="nav-item">
    //           <a className="nav-link disabled" aria-disabled="true">Disabled</a>
    //         </li>
    //       </ul>
    //       <form className="d-flex" role="search">
    //         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
    //         <button className="btn btn-outline-success" type="submit">Search</button>
    //       </form>
    //     </div>
    //   </div>
    // </nav>

    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler mb-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="d-flex align-items-center search-select-container">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search title..."
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              onChange={onCategorySelectChangeHandler}
              className="form-select categories-select"
              aria-label="Select recipe category"
            >
              <option value="0">Select recipe category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            </div>

          <div className='navbar-nav ms-auto text-end gap-2'>
            {!isLoggedIn && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          <div className="navbar-nav ms-auto text-end gap-2">
            {isLoggedIn && (
              <>
                {userRole == "ADMIN" ? (
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/admin"
                  >
                    <span className="username">Account: {userName}</span>
                  </NavLink>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to="/profile"
                  >
                    <span className="username">Account: {userName}</span>
                  </NavLink>
                )}
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/books"
                >
                  Books
                </NavLink>
                <button className="logout" onClick={logoutHandler}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
