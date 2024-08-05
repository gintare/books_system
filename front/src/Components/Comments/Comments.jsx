import { useForm } from 'react-hook-form';
import './Comments.css';

function Comments() {
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

    const onCommentsSubmitClickHandler = () => {

    }

    return(<><div className="comment-form-content row m-3">
    <form
      noValidate
      onSubmit={handleSubmit(onCommentsSubmitClickHandler)}
    >
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
  </div></>);
}

export default Comments;