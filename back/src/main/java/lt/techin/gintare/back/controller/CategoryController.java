package lt.techin.gintare.back.controller;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.CategoryRequestDTO;
import lt.techin.gintare.back.dto.CategoryResponseDTO;
import lt.techin.gintare.back.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/api/categories")
    public ResponseEntity<?> createCategory(@RequestBody CategoryRequestDTO categoryRequestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(categoryRequestDTO));
    }

    @GetMapping("/api/categories")
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryService.findAllCategories();
    }

    @PutMapping("/api/categories/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody CategoryRequestDTO categoryRequestDTO) {
         return ResponseEntity.ok(categoryService.updateCategory(id, categoryRequestDTO));
    }
}
