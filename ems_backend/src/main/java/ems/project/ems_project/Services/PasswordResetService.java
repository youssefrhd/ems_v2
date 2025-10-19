package ems.project.ems_project.Services;

import ems.project.ems_project.Model.User;
import ems.project.ems_project.Repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {
    private final EmailService emailService;
    private final UserRepository userRepository;

    public PasswordResetService(EmailService emailService,UserRepository userRepository) {
        this.emailService = emailService;
        this.userRepository=userRepository;
    }

    public void sendResetEmail(String email) throws MessagingException { //TODO: Update with company logo
        String token = UUID.randomUUID().toString();
        String resetLink = "http://localhost:4200/confirm-password?email=" + email;
        String subject = "reset Password";
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">please click the following Link to reset your Password :</h3>"
                +  "<a style=\"font-size: 18px; font-weight: bold; color: #007bff;\" href=\"" + resetLink + "\">Reset Link</a>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        emailService.sendVerificationEmail(email, subject, htmlMessage);
    }

    public void comfirmPassword(String email,String password){
        Optional<User> optionalUser=userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user=optionalUser.get();
            user.setPassword(password);
            userRepository.save(user);
        }
        else {
            throw new RuntimeException("user not found");
        }


    }

}
