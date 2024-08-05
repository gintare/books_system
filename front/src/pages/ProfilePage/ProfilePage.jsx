import { useContext, useEffect, useState } from "react";
import "./ProfilePage.css";
import UserContext from "../../Context/UserContext/UserContext";
import { getFavoritesByUser } from "../../services/get";
import { toast } from "react-toastify";
import BookCard from "../../Components/BookCard/BookCard";

function ProfilePage() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const { id: userId } = useContext(UserContext);
  console.log("userId = " + userId);

  useEffect(() => {
    const getData = async () => {
      try {
        const fav = await getFavoritesByUser(userId);
        setFavoriteBooks(fav);
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
      }
    };
    getData();
  }, []);

  return (
    <>
      <h1>My favorite books</h1>
      <div className="book-list">
        {favoriteBooks.length == 0 && <p>No favorite books found</p>}
        {favoriteBooks.length > 0 && favoriteBooks.map((fovorite, index) => {
          return <BookCard key={index} book={fovorite.book} />;
        })}
      </div>
      <div className="books-page-footer"></div>
    </>
  );
}

export default ProfilePage;
