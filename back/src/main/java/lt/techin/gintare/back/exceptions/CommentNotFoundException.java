package lt.techin.gintare.back.exceptions;

public class CommentNotFoundException extends RuntimeException{

    public CommentNotFoundException(String msg) {
        super(msg);
    }
}
