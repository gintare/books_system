import { Controller, useForm } from "react-hook-form";
import "./AddbookForm.css";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../../services/get";
import { booksPost } from "../../../services/post";
import { toast } from "react-toastify";
import { updateBook } from "../../../services/update";

function AddbookForm({ book, setUpdate }) {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

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
      name: "",
      description: "",
      isbn: "",
      image: "",
      pagesCount: 0,
      categoryId: 0,
      category: {},
    },
  });

  const formSubmitHandler = async (data) => {
    try{
        let categorId = data.categoryId;
        if(categorId == '0'){
           categorId = categories[0].id;
        }
        console.log(data);
        console.log("categorId = "+categorId);
        let bo;
        if(book){
            bo = await updateBook(categorId, book.id, data);
        }else{
            bo = await booksPost(categorId, data);
        }
        if(!bo){
          throw new Error("Operation unsuccessiful");
        }
        
        setUpdate((prev) => prev + 1);
    }catch(error){
       toast.error(error.message);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
     try{
       const categ = await getAllCategories();
       setCategories(categ);
       if(book){
         setValue('name', book.name, {shouldValidate: true});
         setValue('description', book.description, {shouldValidate: true});
         setValue('isbn', book.isbn, {shouldValidate: true});
         setValue('image', book.image, {shouldValidate: true});
         setValue('pagesCount', book.pagesCount, {shouldValidate: true});
         setValue('categoryId', book.category.id, {shouldValidate: true});
       }
     }catch(error){
       setError(error);
     }
    };
    getCategories();
  }, [book, setValue]);

  return (
    <>
    <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
    {book ? <h6>Edit book</h6> : <h6>Add new book</h6>}
    </div>
      
      <form
        className="row g-3 needs-validation register-form mt-2 d-flex flex-column align-items-stretch"
        noValidate
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="name" className="form-label">
            Book Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            maxLength={40}
            {...register("name", {
              required: "Book name is required",
              maxLength: {
                value: 40,
                message: "Book name cannot exceed 40 characters",
              },
              validate: (value) =>
                value.trim() !== "" || "Book name cannot be empty",
            })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>
        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="description" className="form-label">
            Book Description
          </label>
          <textarea
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            id="description"
            {...register("description")}
          />
        </div>
        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="isbn" className="form-label">
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            className={`form-control ${errors.isbn ? "is-invalid" : ""}`}
            {...register("isbn")}
          />
        </div>
        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="image" className="form-label">
            Image url
          </label>
          <input
            type="txt"
            id="image"
            className={`form-control ${errors.image ? "is-invalid" : ""}`}
            {...register("image", {
              required: "Image url is required",
            })}
          />
        </div>
        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="pagesCount" className="form-label">
            Page count
          </label>
          <input
            type="txt"
            id="pagesCount"
            className={`form-control ${errors.pageCount ? "is-invalid" : ""}`}
            {...register("pagesCount")}
          />
        </div>
        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <Controller
            name='categoryId'
            control={control}
            render={({ field: { onChange, value } }) => (
              <select
                // labelId="category"
                className='form-select form-select-md mb-3'
                id='category'
                value={value}
                label='Category'
                onChange={onChange}
                // {...register("categoryId")}
              >
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  );
                })}
              </select>
            )}
          />
        </div>

        <div className="col-12 col-md-6 col-xl-4 offset-md-3 offset-xl-4 mb-3">
          <button type="submit" className="submit-book-btn submit-btn w-100">
            {book ? "Update book" : "Add book"} 
          </button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </form>
    </>
  );
}

export default AddbookForm;
