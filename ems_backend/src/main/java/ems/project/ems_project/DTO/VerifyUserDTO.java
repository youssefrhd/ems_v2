package ems.project.ems_project.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyUserDTO {
        private String email;
        private String verificationCode;
}
