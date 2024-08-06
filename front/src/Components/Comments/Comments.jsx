import { useForm } from "react-hook-form";
import "./Comments.css";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import { commentPost } from "../../services/post";
import { getCommentsByBook } from "../../services/get";
import { deleteComment } from "../../services/delete";

function Comments({book, bookId}) {
  const {id: userId} = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [update, setUpdate] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const onCommentsSubmitClickHandler = async (data) => {
    try{
      const bo = await commentPost(userId, book.id, data);
      if(!bo){
        throw new Error("No comments was saved");
      }
      reset();
      toast.success("Your comment successfuly saved")
      setUpdate((prev) => prev + 1);
    }catch(error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const deleteCommentOnClickHandler = async (commentId) => {
    //console.log("commentId = "+commentId);
    try{
      const co = await deleteComment(commentId);
      if(!co){
        throw new Error("No comment deleted");
      }
      toast.success("Comment successfuly deleted")
      setUpdate((prev) => prev + 1);
    }catch(error){
      console.error(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    const getData = async () => {
      try{
        // console.log(book.id);
        const com = await getCommentsByBook(bookId);
        if(!com){
          throw new Error("No comments where found");
        }
        setComments(com);
      }catch(error){
        console.error(error.message);
        toast.error(error.message);
      }
    };
    getData();
  }, [update]);

  return (
    <>
      <div className="comment-form-content row m-3">
        <form noValidate onSubmit={handleSubmit(onCommentsSubmitClickHandler)}>
          <div className="mb-3">
            <label htmlFor="commentsTextarea" className="form-label">
              Comment text
            </label>
            <textarea
              className="form-control"
              id="commentsTextarea"
              rows="3"
              {...register("text", {
                required: "Comment text is required",
              })}
            ></textarea>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              Comment
            </button>
          </div>
        </form>
      </div>
      <div>
        {comments.map((comment, index) => {
          return <div key={index} className="comment-list-content m-3">{comment.text}
          {comment.userId == userId && <button onClick={() => {deleteCommentOnClickHandler(comment.id)}}>Delete 🗑️</button>}
          </div>
        })}
      </div>
      <div className="comments-footer">

      </div>
    </>
  );
}

export default Comments;
