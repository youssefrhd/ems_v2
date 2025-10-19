package ems.project.ems_project.controller;

import ems.project.ems_project.Model.User;
import ems.project.ems_project.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping({"/me"})
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User)authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }

    @GetMapping({"/"})
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = this.userService.allUsers();
        return ResponseEntity.ok(users);
    }
}
