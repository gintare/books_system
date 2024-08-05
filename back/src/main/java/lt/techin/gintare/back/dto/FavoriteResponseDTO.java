package lt.techin.gintare.back.dto;

import lombok.Data;

import java.util.Date;

@Data
public class FavoriteResponseDTO {
    private Long id;
    private UserDTO user;
    private BookResponseDTO book;
    private Date createdAt;
}
