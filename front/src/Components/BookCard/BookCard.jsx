import { Card } from 'react-bootstrap';
import './BookCard.css';
import { Link } from 'react-router-dom';

function BookCard({book}){
    return(<>
    <Card className='recipe-card'>
      <Link to={`/book/${book.id}`} key={book.id}>
        <Card.Img variant='top' src={book.image} alt={book.name} />
      </Link>
      <Card.Body>
        <Card.Title className='recipe-card-title'>{book.name}</Card.Title>
        {/* <Card.Text>Preparation time: {recipe.timeInMinutes} min</Card.Text>
        <LikeButton recipeId={recipe.id} userId={id} /> */}
      </Card.Body>
    </Card>
    </>);
}

export default BookCard;