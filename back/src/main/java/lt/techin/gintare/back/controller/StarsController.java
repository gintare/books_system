package lt.techin.gintare.back.controller;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.StarsRequestDTO;
import lt.techin.gintare.back.service.StarsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class StarsController {
    private final StarsService starsService;

    @PostMapping("/api/users/{userId}/books/{bookId}/stars")
    public ResponseEntity<?> createStars(@PathVariable Long userId, @PathVariable Long bookId, @RequestBody StarsRequestDTO starsRequestDTO){
       return ResponseEntity.status(HttpStatus.CREATED).body(starsService.createStars(userId, bookId, starsRequestDTO));
    }

    @GetMapping("/api/users/{userId}/books/{bookId}/stars")
    public ResponseEntity<?> getOneStars(@PathVariable Long userId, @PathVariable Long bookId){
        return ResponseEntity.ok(starsService.getOneStars(userId, bookId));
    }

            @DeleteMapping("/api/stars/{id}")
    public ResponseEntity<?> deleteStars(@PathVariable Long id){
        return ResponseEntity.ok(starsService.deleteStars(id));
    }
}
