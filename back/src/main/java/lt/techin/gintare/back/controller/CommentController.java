package lt.techin.gintare.back.controller;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.CommentRequestDTO;
import lt.techin.gintare.back.dto.CommentResponseDTO;
import lt.techin.gintare.back.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/api/users/{userId}/books/{bookId}/comments")
    public ResponseEntity<?> createComment(@PathVariable Long userId, @PathVariable Long bookId, @RequestBody CommentRequestDTO commentRequestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createComment(userId, bookId, commentRequestDTO));
    }

    @GetMapping("/api/books/{bookId}/comments")
    public List<CommentResponseDTO> findCommentsByRecipe(@PathVariable Long bookId){
        return commentService.findByBook(bookId);
    }

    @DeleteMapping("/api/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId){
        return ResponseEntity.ok(commentService.deleteComment(commentId));
    }

}
