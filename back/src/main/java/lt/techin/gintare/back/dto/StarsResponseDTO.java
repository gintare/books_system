package lt.techin.gintare.back.dto;


import lombok.Data;

@Data
public class StarsResponseDTO {
    private Long id;
    private Integer starsCount;
    private Long userId;
    private Long bookId;
}
