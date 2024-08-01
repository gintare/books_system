package lt.techin.gintare.back.dto;

import lombok.Data;

@Data
public class BookResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String isbn;
    private String image;
    private String pagesCount;
    private CategoryResponseDTO category;
}
