package lt.techin.gintare.back.repository;

import lt.techin.gintare.back.model.Book;
import lt.techin.gintare.back.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByCategory(Category category);
}
