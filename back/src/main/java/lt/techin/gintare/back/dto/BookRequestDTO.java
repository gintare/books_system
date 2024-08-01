package lt.techin.gintare.back.dto;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class BookRequestDTO {
    private String name;
    private String description;
    private String isbn;
    private String image;
    private String pagesCount;
}
