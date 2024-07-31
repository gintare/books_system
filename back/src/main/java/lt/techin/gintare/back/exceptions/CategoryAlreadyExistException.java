package lt.techin.gintare.back.exceptions;

public class CategoryAlreadyExistException extends RuntimeException{

    public CategoryAlreadyExistException(String msg){
        super(msg);
    }
}
