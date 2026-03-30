package ems.project.ems_project.controller;

import ems.project.ems_project.DTO.PasswordComfirmation;
import ems.project.ems_project.Exceptions.ResourceNotFound;
import ems.project.ems_project.Model.User;
import ems.project.ems_project.Repository.UserRepository;
import ems.project.ems_project.Services.PasswordResetService;
import jakarta.mail.MessagingException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PasswordController {

    private final UserRepository userRepository;
    public PasswordController(PasswordResetService passwordResetService,UserRepository userRepository) {
        this.passwordResetService = passwordResetService;
        this.userRepository=userRepository;
    }

    private final PasswordResetService passwordResetService;
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String email) throws MessagingException {
        try{
            Optional<User> optionalUser=userRepository.findByEmail(email);
            if(optionalUser.isPresent()){
                User user=optionalUser.get();
                if(user.isVerified()){
                    passwordResetService.sendResetEmail(email);
                    return ResponseEntity.ok("Reset Email sent");
                }
                else{
                    return ResponseEntity.badRequest().body(new RuntimeException("the account is not verified ! "));
                }
            }
            else throw new ResourceNotFound("User not found ! ");


        }catch(RuntimeException var){
            return ResponseEntity.badRequest().body(var.getMessage());
        }
    }

    @PutMapping("/confirm-password")
    public ResponseEntity<?> confirmPassword(@RequestBody PasswordComfirmation passConfirm){
        try {
            System.out.println("the requested Email is :  " + passConfirm.getEmail());
            passwordResetService.comfirmPassword(passConfirm.getEmail(), passConfirm.getPassword());
            return ResponseEntity.ok("password recovered sucessfully !");
        }catch (RuntimeException v){
            System.err.println("Error: " + v.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(v.getMessage());
        }
    }
}
