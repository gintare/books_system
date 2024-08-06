import { toast } from "react-toastify";
import "./Stars.css";
import { useEffect, useState } from "react";
import { getOneStars } from "../../services/get";
import { starsPost } from "../../services/post";
import { deleteStars } from "../../services/delete";

function Stars({ bookId, userId }) {
  const [filledStars, setFilledStars] = useState([]);
  const [starsId, setStarsId] = useState('');

  const fillStars = (index, isFillStars) => {
    for (let i = 0; i <= index; i++) {
      setFilledStars((prev) => {
        const newFilledStars = [...prev];
        newFilledStars[i] = isFillStars;
        return newFilledStars;
      });
    }
  };

  const handleStarClick = async (index) => {
    try{
        toast.success("Success");
        fillStars(5, false);
        fillStars(index, true);
        if(starsId){
          const st = await deleteStars(starsId);
          if(!st){
            throw new Error("Unsucessful stars deletion");
          }
        }
        const data = {starsCount : index};
        const st = await starsPost(userId, bookId, data);
        if(!st){
          throw new Error("Unsuccessful stars save");
        }
    } catch (error) {
        console.error(error.message);
        toast.error(error.message);
    }
    
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const st = await getOneStars(userId, bookId);
        console.log(st);
        if(st.id){
          setStarsId(st.id);
          fillStars(st.starsCount, true);
        }
      } catch (error) {
        console.error(error.message);
        toast.error(error.message);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="stars-content">
        {[...Array(5)].map((_, index) => (
          <i
            key={index}
            className={`bi ${
              filledStars[index] ? "bi-star-fill" : "bi-star"
            } star-${index}`}
            onClick={() => handleStarClick(index)}
            style={{ cursor: "pointer", color: "black" }}
          ></i>
        ))}
      </div>
      {/* <div className='stars-content'>
      <i className="star-1 bi bi-star" onClick={() => {displayFillStarOnMouseOverHandler()}}></i>
      <i className="bi bi-star-fill star-fill star-fill-1"></i>
      <i className="bi bi-star"></i>
      <i className="bi bi-star-fill star-fill"></i>
      <i className="bi bi-star"></i>
      <i className="bi bi-star-fill star-fill"></i>
      <i className="bi bi-star"></i>
      <i className="bi bi-star-fill star-fill"></i>
      <i className="bi bi-star"></i>
      <i className="bi bi-star-fill star-fill"></i>
    </div> */}
    </>
  );
}

export default Stars;
