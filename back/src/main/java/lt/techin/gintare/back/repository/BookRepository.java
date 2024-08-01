package lt.techin.gintare.back.repository;

import lt.techin.gintare.back.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
