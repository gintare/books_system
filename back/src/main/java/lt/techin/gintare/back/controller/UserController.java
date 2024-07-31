package lt.techin.gintare.back.controller;

import lt.techin.gintare.back.dto.LoginDTO;
import lt.techin.gintare.back.dto.ResponseLoginDTO;
import lt.techin.gintare.back.dto.UserDTO;
import lt.techin.gintare.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/test")
    public String test() {
        return "test";
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody UserDTO userDTO) {
        return userService.registerUser(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseLoginDTO> login(@RequestBody LoginDTO loginDTO) {
        ResponseLoginDTO loggedUser = userService.loginUser(loginDTO);
        if (loggedUser.getToken() == null) {
            return ResponseEntity.badRequest().body(loggedUser);
        }
        return ResponseEntity.ok(loggedUser);
    }
}
