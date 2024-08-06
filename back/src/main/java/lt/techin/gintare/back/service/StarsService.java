package lt.techin.gintare.back.service;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.StarsRequestDTO;
import lt.techin.gintare.back.dto.StarsResponseDTO;
import lt.techin.gintare.back.exceptions.BookNotFoundException;
import lt.techin.gintare.back.exceptions.StarsNotFoundException;
import lt.techin.gintare.back.exceptions.UserNotFoundException;
import lt.techin.gintare.back.model.Book;
import lt.techin.gintare.back.model.Stars;
import lt.techin.gintare.back.model.User;
import lt.techin.gintare.back.repository.BookRepository;
import lt.techin.gintare.back.repository.StarsRepository;
import lt.techin.gintare.back.repository.UserRepository;
import org.hibernate.sql.ast.tree.expression.Star;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StarsService {
    private final StarsRepository starsRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public StarsResponseDTO createStars(Long userId, Long bookId, StarsRequestDTO starsRequestDTO) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found with an id = "+userId));
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("No book found with an id = "+bookId));
        Stars stars = new Stars();
        stars.setStarsCount(starsRequestDTO.getStarsCount());
        stars.setUser(user);
        stars.setBook(book);
        starsRepository.save(stars);
        return getStarsResponseDTO(stars);
    }

    private StarsResponseDTO getStarsResponseDTO(Stars stars){
        StarsResponseDTO starsResponseDTO = new StarsResponseDTO();
        starsResponseDTO.setId(stars.getId());
        starsResponseDTO.setStarsCount(stars.getStarsCount());
        starsResponseDTO.setUserId(stars.getUser().getId());
        starsResponseDTO.setBookId(stars.getBook().getId());
        return starsResponseDTO;
    }

    public StarsResponseDTO getOneStars(Long userId, Long bookId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found with an id = "+userId));
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("No book found with an id = "+bookId));
        List<Stars> starsList = starsRepository.getByUserAndBook(user, book);
        StarsResponseDTO starsResponseDTO;
        if(starsList.isEmpty()){
            starsResponseDTO = new StarsResponseDTO();
        } else {
            starsResponseDTO = getStarsResponseDTO(starsList.get(0));
        }
        return starsResponseDTO;
//        return null;
    }

    public StarsResponseDTO deleteStars(Long id) {
        Stars stars = starsRepository.findById(id).orElseThrow(() -> new StarsNotFoundException("No stars found by id = "+id));
        this.starsRepository.delete(stars);
        return getStarsResponseDTO(stars);
    }
}
