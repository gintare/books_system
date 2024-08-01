package lt.techin.gintare.back.exceptions.handler;

import lt.techin.gintare.back.exceptions.BookNotFoundException;
import lt.techin.gintare.back.exceptions.CategoryAlreadyExistException;
import lt.techin.gintare.back.exceptions.CategoryNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler(Somethin.class)
//    public ResponseEntity<ErrorDetails> exceptionSomethingNotFoundHandler(SomethingNotFoundException ex) {
//        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
//        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler(CategoryAlreadyExistException.class)
    public ResponseEntity<ErrorDetails> exceptionCategoryAlreadyExistHandler(CategoryAlreadyExistException ex) {
        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ErrorDetails> exceptionCategoryNotFoundHandler(CategoryNotFoundException ex) {
        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<ErrorDetails> exceptionBookNotFoundHandler(BookNotFoundException ex) {
        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }
}
