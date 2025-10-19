package ems.project.ems_project.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
@Entity
@Table(name="cart")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payment_id;
    @Column(name = "paid_at")
    private LocalDate paid_at;
    @Column(name = "amount")
    private double amount;
    @Column(name = "pay_methode")
    private String Pay_methode;

    @OneToOne
    private Order order;
}
