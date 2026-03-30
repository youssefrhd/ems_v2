package ems.project.ems_project.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Entity
@Table(name="user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long client_id;

    @Column(name ="firstname")
    private String firstname;
    @Column(name = "lastname")
    private String lastname;
    @Column(name = "email" ,unique = true, nullable = false)
    private String email;
    @Column(name = "adresse" )
    private String adresse;
    @Column(name = "phone_num")
    private String phone_num;
    @Column(name = "username" , unique=true)
    private String username;
    @Column(name = "password" ,nullable=false)
    private String password;
    @Column(name = "role" ,columnDefinition = "VARCHAR(255) DEFAULT 'client'")
    private String role;
    @Column(name = "isLoggedIn",columnDefinition = "boolean default false")
    private Boolean isLoggedIn;
    @Column(name = "verification_code")
    private String verificationCode;
    private LocalDateTime verificationCodeExpiresAt;
    @Column(name="verified" )
    private boolean verified;

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public void setClient_id(Long client_id) {
        this.client_id = client_id;
    }

    public void setVerificationCodeExpiresAt(LocalDateTime verificationCodeExpiresAt) {
        this.verificationCodeExpiresAt = verificationCodeExpiresAt;
    }

    /* @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
            private List<Adresse> adresses;
        */
    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
    private Cart cart;


    public User(String username, String email, String password) {

        this.username=username;
        this.email=email;
        this.password=password;

    }
    public User() {

    }

    public User( String username, String email, String password,String role) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
    }
    public void setOrder(Order order){
        getOrders().add(order);
    }


    public void setLoggedIn(Boolean logged) {
        isLoggedIn = logged;
    }

    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of();
    }
    public boolean isAccountNonExpired() {
        return true;
    }

    public boolean isAccountNonLocked() {
        return true;
    }

    public boolean isCredentialsNonExpired() {
        return true;
    }
    public void setRole(String role){
        this.role=role;
    }



}


