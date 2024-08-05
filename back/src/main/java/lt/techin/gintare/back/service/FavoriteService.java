package lt.techin.gintare.back.service;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.BookResponseDTO;
import lt.techin.gintare.back.dto.FavoriteResponseDTO;
import lt.techin.gintare.back.dto.UserDTO;
import lt.techin.gintare.back.exceptions.BookNotFoundException;
import lt.techin.gintare.back.exceptions.FavoriteNotFoundException;
import lt.techin.gintare.back.exceptions.UserNotFoundException;
import lt.techin.gintare.back.model.Book;
import lt.techin.gintare.back.model.Favorite;
import lt.techin.gintare.back.model.User;
import lt.techin.gintare.back.repository.BookRepository;
import lt.techin.gintare.back.repository.FavoriteRepository;
import lt.techin.gintare.back.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public FavoriteResponseDTO createFavorite(Long userId, Long bookId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found with an id = "+userId));
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("No book found with an id = "+bookId));
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setBook(book);
        favorite.setCreatedAt(new Date());
        favoriteRepository.save(favorite);
        return getFavoriteResponseDTO(favorite);
    }

    private FavoriteResponseDTO getFavoriteResponseDTO(Favorite favorite) {
        FavoriteResponseDTO favoriteResponseDTO = new FavoriteResponseDTO();
        UserDTO userDTO = new UserDTO();
        userDTO.setId(favorite.getUser().getId());
        userDTO.setUserName(favorite.getUser().getUsername());
        favoriteResponseDTO.setUser(userDTO);
        BookResponseDTO bookResponseDTO = new BookResponseDTO();
        bookResponseDTO.setId(favorite.getBook().getId());
        bookResponseDTO.setName(favorite.getBook().getName());
        bookResponseDTO.setIsbn(favorite.getBook().getIsbn());
        bookResponseDTO.setDescription(favorite.getBook().getDescription());
        bookResponseDTO.setImage(favorite.getBook().getImage());
        bookResponseDTO.setPagesCount(favorite.getBook().getPagesCount());
        favoriteResponseDTO.setBook(bookResponseDTO);
        favoriteResponseDTO.setCreatedAt(favorite.getCreatedAt());
        return favoriteResponseDTO;
    }

    public FavoriteResponseDTO deleteFavorite(Long id) {
        Favorite favorite = favoriteRepository.findById(id).orElseThrow(() -> new FavoriteNotFoundException("No favorite found by an id = "+id));
        favoriteRepository.delete(favorite);
        return getFavoriteResponseDTO(favorite);
    }

    public void deleteFavorite(Long userId, Long bookId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found with an id = "+userId));
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("No book found with an id = "+bookId));
        List<Favorite> favorites = favoriteRepository.findByUserAndBook(user, book);
        for(Favorite favorite: favorites){
            favoriteRepository.delete(favorite);
        }
    }

    public FavoriteResponseDTO getOneFavorite(Long userId, Long bookId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found with an id = "+userId));
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("No book found with an id = "+bookId));
        List<Favorite> list = favoriteRepository.findByUserAndBook(user, book);
        FavoriteResponseDTO favoriteResponseDTO = null;
        if(!list.isEmpty()){
            favoriteResponseDTO = getFavoriteResponseDTO(list.get(0));
        }
        return favoriteResponseDTO;
    }

    public boolean isFavorite(Long userId, Long bookId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found with an id = "+userId));
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("No book found with an id = "+bookId));
        List<Favorite> list = favoriteRepository.findByUserAndBook(user, book);
        if(!list.isEmpty()){
            return true;
        }
        return false;
    }

    public List<FavoriteResponseDTO> findFavoritesByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found with an id = "+userId));
        List<Favorite> favorites = favoriteRepository.findByUser(user);
        List<FavoriteResponseDTO> favoriteResponseDTOS = new ArrayList<>();
        for(Favorite favorite : favorites){
          favoriteResponseDTOS.add(getFavoriteResponseDTO(favorite));
        }
        return favoriteResponseDTOS;
    }
}
