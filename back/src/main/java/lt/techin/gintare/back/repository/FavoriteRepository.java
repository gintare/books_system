package lt.techin.gintare.back.repository;

import lt.techin.gintare.back.model.Book;
import lt.techin.gintare.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import lt.techin.gintare.back.model.Favorite;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserAndBook(User user, Book book);

    List<Favorite> findByUser(User user);
}
