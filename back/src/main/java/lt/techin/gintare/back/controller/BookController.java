package lt.techin.gintare.back.controller;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.BookPageResponseDTO;
import lt.techin.gintare.back.dto.BookRequestDTO;
import lt.techin.gintare.back.dto.BookResponseDTO;
import lt.techin.gintare.back.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class BookController {

    public final BookService bookService;

    @PostMapping("/api/categories/{categoryId}/books")
    public ResponseEntity<?> createBook(@PathVariable Long categoryId, @RequestBody BookRequestDTO bookRequestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.createBook(categoryId, bookRequestDTO));
    }

    @DeleteMapping("/api/books/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id){
        return ResponseEntity.ok(bookService.deleteBook(id));
    }

    @GetMapping("/api/books")
    public BookPageResponseDTO getAllBooks(@RequestParam Integer page){
        return bookService.getAllBooks(page);
    }

    @PutMapping("/api/categories/{categoryId}/books/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long categoryId, @PathVariable Long id, @RequestBody BookRequestDTO bookRequestDTO){
        return ResponseEntity.ok(bookService.updateBook(categoryId, id, bookRequestDTO));

    }

    @GetMapping("/api/books/{id}")
    public ResponseEntity<?> getOneBook(@PathVariable Long id){
        return ResponseEntity.ok(bookService.getOneBook(id));
    }

    @GetMapping("/api/categories/{categoryId}/books")
    public List<BookResponseDTO> getBooksByCategory(@PathVariable Long categoryId){
        return bookService.getBooksByCategory(categoryId);
    }

}
