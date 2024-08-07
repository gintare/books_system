package lt.techin.gintare.back.dto;

import lombok.Data;

import java.util.List;

@Data
public class BookPageResponseDTO {
    private Long totalRecords;
    private Integer page;
    private Integer countPerPage;
    private Integer totalPages;
    private List<BookResponseDTO> books;
}
