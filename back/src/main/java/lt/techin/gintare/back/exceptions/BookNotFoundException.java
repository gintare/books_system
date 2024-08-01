package lt.techin.gintare.back.exceptions;

public class BookNotFoundException extends RuntimeException{

    public BookNotFoundException(String msg){
        super(msg);
    }
}
