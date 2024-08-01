import { useForm } from 'react-hook-form';
import './CategoriesForm.css';
import { useContext, useState } from 'react';
import { categoriesPost } from '../../../services/post';
import CategoriesContext from '../../../Context/CategoriesContext/CategoriesContext';
import { toast } from 'react-toastify';


function CategoriesForm() {
    const { categories, setCategories, update, setUpdate } = useContext(CategoriesContext);
    const[ formError, setFormError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: {
          title: '',
        },
      });

    const formSubmitHandler = async (data) => {
        const checkTitle = (categor) => {
           return categor.title == data.title;
        };
        const isSome = categories.some(checkTitle);
        console.log("isSome = "+isSome);
        if(isSome){
           toast.error("Category title already exist");
        } else {
            try{
                const categ = await categoriesPost(data);
                if(!categ) {
                  throw new Error("No category created");
                }
                reset();
                setUpdate((prev) => prev + 1);
             }catch(error){
               console.error(error.message);
               setFormError(error.message);
             }
        }  
      
    }


    return(<>
    
      <form
          className='needs-validation register-form mt-2 d-flex flex-column align-items-center'
          noValidate
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <h6>Create new category</h6>
            <div className='mb-3'>
            <input
              placeholder='Category title'
              type='text'
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              id='title'
              {...register('title', {
                required: 'Category title is required',
                validate: (value) => value.trim() !== '' || 'Category title cannot be empty',
              })}
            />
            {errors.title && <div className='invalid-feedback'>{errors.title.message}</div>}
          </div>
          <button type='submit' className='btn btn-success submit-category-btn'>
            Submit
          </button>
        </form>
        {formError && <div className='invalid-feedback'>{formError}</div>}
    </>);
}

export default CategoriesForm;