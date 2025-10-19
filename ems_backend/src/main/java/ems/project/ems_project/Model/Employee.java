package ems.project.ems_project.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="employee")
public class Employee {
    @Id
    private long id;
    @Column(name = "firstname")
    private String firstname;
    @Column(name = "lastname")
    private String lasttname;
    @Column(name = "username",nullable = false,unique = true)
    private String username;
    @Column(name = "password" ,nullable=false)
    private String password;
}

