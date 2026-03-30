package ems.project.ems_project.controller;

import ems.project.ems_project.DTO.EmailBody;
import ems.project.ems_project.DTO.LoginDTO;
import ems.project.ems_project.DTO.RegisterDTO;
import ems.project.ems_project.DTO.VerifyUserDTO;
import ems.project.ems_project.Model.User;
import ems.project.ems_project.Services.AuthService;
import ems.project.ems_project.Services.JwtService;
import ems.project.ems_project.Services.UserService;
import ems.project.ems_project.responses.LoginResponse;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    private final JwtService jwtService;
    private final AuthService authenticationService;

    public AuthController(JwtService jwtService, AuthService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }


    @PostMapping({"/signup"})
    public ResponseEntity<User> register(@RequestBody RegisterDTO registerUserDto) throws MessagingException {
        User registeredUser = this.authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping({"/login"})
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginDTO loginDto) {
        User authenticatedUser = this.authenticationService.authenticate(loginDto);
        String jwtToken = this.jwtService.generateToken(authenticatedUser);
        System.out.println("jwt token : "+jwtToken);
        if (authenticatedUser == null) {
            System.out.println("🚨 Authentication failed: User is null!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } else {
            LoginResponse loginResponse = new LoginResponse(authenticatedUser.getEmail(),authenticatedUser.getRole(),jwtToken, this.jwtService.getExpirationTime());
            authenticatedUser.setLoggedIn(true);
            return ResponseEntity.ok(loginResponse);
        }

    }

    @PostMapping({"/verify"})
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDTO verifyUserDto) {
        try {
            this.authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException var3) {
            return ResponseEntity.badRequest().body(var3.getMessage());
        }
    }



    @PostMapping({"/resend"})
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) throws MessagingException {
        try {
            this.authenticationService.resendVerificationCode(email);
            System.out.println("Resending verification code to: " + email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException var3) {
            return ResponseEntity.badRequest().body(var3.getMessage());
        }
    }


}
