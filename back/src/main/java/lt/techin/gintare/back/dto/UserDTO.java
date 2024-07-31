package lt.techin.gintare.back.dto;

import lombok.Data;

@Data
public class UserDTO {

    private Long id;
    private String userName;
    private String email;
    private String password;
    private String role;
}
