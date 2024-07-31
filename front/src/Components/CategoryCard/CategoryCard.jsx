import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
//import { updateCategoryAuth } from '../../services/update';
import { getUserRoleFromToken } from '../../utils/jwt';
import { useForm } from 'react-hook-form';
// import { deleteCategory } from '../../services/delete';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './CategoryCard.css';
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

  //console.log("role = "+role);

  const handleShow = (category_id) => {
    setCategoryId(category_id);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    try {
      setShow(false);
      if (role === 'ADMIN') {
        // await deleteCategory(categoryId);
        toast.success('Category deleted successfully');
        setUpdate((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error deleting category:', error.message);
      toast.error('Error deleting category');
    }
  };

  return (
    <>
      <article className="category-card p-2">
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
