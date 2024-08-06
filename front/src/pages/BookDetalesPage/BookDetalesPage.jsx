import { useParams } from "react-router-dom";
import "./BookDetalesPage.css";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getIsFavorite, getOneBook } from "../../services/get";
import { HeartFill, Heart } from 'react-bootstrap-icons';
import UserContext from "../../Context/UserContext/UserContext";
import { favoritePost } from "../../services/post";
import { deleteFavorite } from "../../services/delete";
import Comments from "../../Components/Comments/Comments";

function BookDetalesPage() {
  const { id: bookId } = useParams();
  const contextContent = useContext(UserContext);
  const {user, id : userId, token} = contextContent;
  const [book, setBook] = useState({});
  const [category, setCategory] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [comments, setComments] = useState([]);

  // console.log("userRole = "+userRole);
  // console.log("userId = "+userId);
  // console.log("Books details from context", contextContent);

  const clickFavoriteHandler = () => {
    setFavorite((favorite) => !favorite);

    if (!favorite) {
      const fav = favoritePost(user.id, bookId);
    } else {
      deleteFavorite(user.id, bookId);
    }
  }

  useEffect(() => {
    const getBook = async () => {
        try{
          const bo = await getOneBook(bookId)
          setBook(bo);
          setCategory(bo.category.title);
          
          if(bookId) {
            const isFav = await getIsFavorite(userId, bookId);
            //console.log("isFav = "+isFav);
            setFavorite(isFav);
          }

        }catch(error){
          console.error(error.message);
          toast.error(error.message);
        }

    };
    getBook();
  }, []);

  return (
    <>
      <div className="row">
        <div className="book-detales-page-img col-sm-6 image-content">
          <img src={book.image} alt="recipe_photo" />
        </div>
        <div className="col col-sm-6 recipe-info-content">
          <h5 className="card-title">{book.name}</h5>
          <br />
          <label htmlFor="description" className="col col-form-label">
            Description:
          </label>
          <div className="col ">{book.description}</div>
          <label htmlFor="isbn" className="col col-form-label">
            ISBN:
          </label>
          <div id="isbn" className="col ">{book.isbn}</div>
          <label htmlFor="categoryName" className="col col-form-label">
            Book category:
          </label>
          <div className="col ">{category}</div>
          Pages count : {book.pagesCount}
        </div>
      </div>
      <div className="row">
        <div className="col col-sm-6 p-5">
             <span>My favorite</span>
              {favorite ? (
                <><HeartFill color='red' size='36' onClick={clickFavoriteHandler} /> </>
              ) : (
                <Heart color='red' size='36' onClick={clickFavoriteHandler} />
              )}
        </div>
        <div className="col col-sm-6 p-5">
          zvaigzdutes
        </div>
      </div>
      <Comments book={book} bookId={bookId} />
    </>
  );
}

export default BookDetalesPage;
