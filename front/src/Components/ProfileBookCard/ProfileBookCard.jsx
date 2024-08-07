import { useState } from "react";
import "./ProfileBookCard.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Modal } from "react-bootstrap";
import { deleteBook } from "../../services/delete";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ProfileBookCard({ book, setUpdate, setUpdateBook }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [bookId, setBookId] = useState('');

  const handleShow = (book_id) => {
    try {
      setBookId(book_id);
      setShow(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClose = () => setShow(false);

  const deleteItem = async () => {
    try {
     setShow(false);
     const bo = await deleteBook(bookId);
     if(!bo){
        setError('No records deleted');
     }
     toast.success('Book has been deleted');
     setUpdate((prev) => prev + 1);
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <Card className="profile-book-card">
        <Link to={`/book/${book.id}`}><Card.Img variant="top" src={book.image} /></Link>
        <Card.Body>
          <Card.Title>{book.name}</Card.Title>
          <Button variant="primary" onClick={() => handleShow(book.id)}>Delete</Button>
          <Button variant="primary" onClick={() => setUpdateBook(book)}>Update</Button>
        </Card.Body>
      </Card>

      {/* <Modal show={show} onHide={handleClose}> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this book?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={deleteItem}>
            Delete Book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileBookCard;
