package lt.techin.gintare.back.controller;

import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import lt.techin.gintare.back.service.FavoriteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;

    @PostMapping("/api/user/{userId}/book/{bookId}/favorites")
    public ResponseEntity<?> createFavorite(@PathVariable Long userId, @PathVariable Long bookId){
        return ResponseEntity.status(HttpStatus.CREATED).body(favoriteService.createFavorite(userId, bookId));
    }

    @DeleteMapping("/api/favorites/{id}")
    public ResponseEntity<?> deleteFavorite(@PathVariable Long id){
        return ResponseEntity.ok(favoriteService.deleteFavorite(id));
    }

    @GetMapping("/api/users/{userId}/books/{bookId}/favorites")
    public ResponseEntity<?> isFavorite(@PathVariable Long userId, @PathVariable Long bookId) {
        return ResponseEntity.ok(favoriteService.isFavorite(userId, bookId));
    }

    @GetMapping("/api/users/{userId}/favorites")
    public ResponseEntity<?> getFavoritesByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteService.findFavoritesByUserId(userId));
    }

    @DeleteMapping("/api/users/{userId}/books/{bookId}/favorites")
    public void deleteFavorite(@PathVariable Long userId, @PathVariable Long bookId) {
        favoriteService.deleteFavorite(userId, bookId);
    }

}
