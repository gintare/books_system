package lt.techin.gintare.back.repository;

import lt.techin.gintare.back.model.Book;
import lt.techin.gintare.back.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBookOrderByCreatedAt(Book book);
}
