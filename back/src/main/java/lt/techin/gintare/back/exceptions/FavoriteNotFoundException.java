package lt.techin.gintare.back.exceptions;

import lt.techin.gintare.back.model.Favorite;

public class FavoriteNotFoundException extends RuntimeException{

    public FavoriteNotFoundException(String msg){
        super(msg);
    }
}
