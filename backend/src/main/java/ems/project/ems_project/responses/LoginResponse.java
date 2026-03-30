package ems.project.ems_project.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import ems.project.ems_project.Model.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginResponse {


    private String role;
    private String email;
    private String token;
    private long expiresIn;

    public LoginResponse(String email ,String role ,String token, long expiresIn) {
       this.role=role;
       this.email=email;
        this.token = token;
        this.expiresIn = expiresIn;
    }
}
