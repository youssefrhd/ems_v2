package ems.project.ems_project.responses;

import org.springframework.context.annotation.Bean;

public class RegisterResponse {
    private String email;
    private String verificationCode;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public RegisterResponse(String email, String verificationCode) {
        this.email = email;
        this.verificationCode = verificationCode;
    }
}
