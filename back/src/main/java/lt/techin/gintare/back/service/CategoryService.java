package lt.techin.gintare.back.service;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.CategoryRequestDTO;
import lt.techin.gintare.back.dto.CategoryResponseDTO;
import lt.techin.gintare.back.exceptions.CategoryAlreadyExistException;
import lt.techin.gintare.back.exceptions.CategoryNotFoundException;
import lt.techin.gintare.back.model.Category;
import lt.techin.gintare.back.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryResponseDTO createCategory(CategoryRequestDTO categoryRequestDTO) {
        List<Category> categoryByTitle = categoryRepository.findByTitle(categoryRequestDTO.getTitle());
        if(!categoryByTitle.isEmpty()){
            throw new CategoryAlreadyExistException("Category with title '"+categoryRequestDTO.getTitle()+"' exists already");
        }

        Category category = new Category();
        category.setTitle(categoryRequestDTO.getTitle());
        this.categoryRepository.save(category);
        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
        categoryResponseDTO.setId(category.getId());
        categoryResponseDTO.setTitle(category.getTitle());
        return categoryResponseDTO;
    }

    public List<CategoryResponseDTO> findAllCategories() {
        List<CategoryResponseDTO> categoryResponseDTOS = new ArrayList<>();
        List<Category> categories = categoryRepository.findAll();
        for(Category category : categories){
            CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
            categoryResponseDTO.setId(category.getId());
            categoryResponseDTO.setTitle(category.getTitle());
            categoryResponseDTOS.add(categoryResponseDTO);
        }

        return categoryResponseDTOS;
    }

    public CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO categoryRequestDTO) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("No category found with an id = "+id));
        category.setTitle(categoryRequestDTO.getTitle());
        categoryRepository.save(category);
        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
        categoryResponseDTO.setId(category.getId());
        categoryResponseDTO.setTitle(category.getTitle());
        return categoryResponseDTO;
    }
}
