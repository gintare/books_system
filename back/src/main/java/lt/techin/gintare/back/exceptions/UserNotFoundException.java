package lt.techin.gintare.back.exceptions;

import lt.techin.gintare.back.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException (String msg){
        super(msg);
    }
}
