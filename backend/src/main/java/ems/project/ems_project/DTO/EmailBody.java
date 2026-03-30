package ems.project.ems_project.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailBody {
    private String to;
    private String subject;
    private String message;

    public EmailBody(String to, String subject, String message) {
        this.to = to;
        this.subject = subject;
        this.message = message;
    }
}
