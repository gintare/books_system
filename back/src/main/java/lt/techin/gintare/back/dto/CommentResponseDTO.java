package lt.techin.gintare.back.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CommentResponseDTO {
    private Long id;
    private String text;
    private Long userId;
    private Long bookId;
    private Date createdAt;
}
