import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//import { updateCategoryAuth } from '../../services/update';
import { getUserRoleFromToken } from '../../utils/jwt';
import { useForm } from 'react-hook-form';
import { deleteCategory } from '../../services/delete';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './CategoryCard.css';
import { updateCategory } from '../../services/update';
import { getAllCategories } from '../../services/get';
// import { getAllCategories } from '../../services/get';

function CategoryCard({ category, setUpdate }) {
  const {title, id} = category;
  const [editName, setEditName] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');
  const [existingCategories, setExistingCategories] = useState([]);
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");
  const role = getUserRoleFromToken(token);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();


  //console.log("role = "+role);

  const handleShow = (category_id) => {
    setCategoryId(category_id);
    setShow(true);
  };

  const validateCategoryInput = (value) => {
    const min = 3;
    const max = 15;

    if (value.length < min) {
      toast.error(`Category name must be at least ${min} characters`);
      return false;
    }
    if (value.length > max) {
      toast.error(`Category name cannot exceed ${max} characters`);
      return false;
    }
    // if (!/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(value)) {
    //   toast.error('Category name can only contain letters and a single space between words');
    //   return false;
    // }
    return true;
  };

  const handleCategoryNameChange = async (data) => {
    if (!validateCategoryInput(data.title)) {
      return;
    }

    console.log(existingCategories);

    if (
      existingCategories.some(
        (existingCat) => existingCat.title.toLowerCase() === data.title.toLowerCase()
      )
    ) {
      toast.error('This category already exists!');
      return;
    }

    try {
      if (role === 'ADMIN') {
        await updateCategory(`${category.id}`, data);
        setUpdate((prev) => !prev);
        setEditName(false);
        toast.success('Category name updated successfully');
      }
    } catch (error) {
      console.error('Error updating title:', error.message);
      toast.error('Error updating category name');
    }
  }

  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    try {
      setShow(false);
      if (role === 'ADMIN') {
        await deleteCategory(categoryId);
        toast.success('Category deleted successfully');
        setUpdate((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error deleting category:', error.message);
      toast.error('Error deleting category');
    }
  };

  useEffect(() => {
    if (category) {
      setValue('title', category.title);
    }
  }, [category, setValue]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setExistingCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <article className="category-card p-2">
      {editName && role === 'ADMIN' ? (
          <form
            onSubmit={handleSubmit(handleCategoryNameChange)}
            className='d-flex align-items-center'
          >
            <input
              type='text'
              defaultValue={title}
              {...register('title')}
              className={`form-edit-input w-75 ${errors.title ? 'is-invalid' : ''}`}
            />
            {errors.name && <div className='invalid-feedback'>{errors.title.message}</div>}
            <button type='submit' className='btn btn-link p-0'>
              <i className='bi bi-check-circle-fill accept-category'></i>
            </button>
            <button type='button' className='btn btn-link p-0' onClick={() => setEditName(false)}>
              <i className='bi bi-x-circle-fill cancel-category'></i>
            </button>
          </form>
        ) : (
        <div className="d-flex justify-content-between align-items-center">
          <div className="category-name">{title}</div>
          {role === "ADMIN" && (
            <div>
              <i
                className="bi bi-pen-fill edit-category"
                onClick={() => setEditName(true)}
              ></i>
              <i
                className="bi bi-trash3-fill delete-category"
                onClick={() => handleShow(category.id)}
              ></i>
            </div>
          )}
        </div>
        )}
      </article>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='modal-header'></Modal.Header>
        <Modal.Body>
          Do you really want to delete category <b>{title}</b>?
        </Modal.Body>
        <Modal.Footer className='modal-footer'>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: 'var(--tomato)', color: 'white', border: 'none' }}
            onClick={handleDelete}
          >
            Delete Category
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CategoryCard;
