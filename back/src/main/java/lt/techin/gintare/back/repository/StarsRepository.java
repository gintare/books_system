package lt.techin.gintare.back.repository;

import lt.techin.gintare.back.model.Book;
import lt.techin.gintare.back.model.Stars;
import lt.techin.gintare.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StarsRepository extends JpaRepository<Stars, Long> {
    List<Stars> getByUserAndBook(User user, Book book);
}
