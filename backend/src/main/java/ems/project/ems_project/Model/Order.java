package ems.project.ems_project.Model;

import ems.project.ems_project.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long order_id;
    @Column(name = "transaction_id")
    private String transaction_id;
    @Column(name = "total_price")
    private double total_price;
    @Column(name="payment_method")
    private String payment_method;
    @Column(name = "email" , unique = false)
    private String email;
    @Column(name = "orderDate")
    private LocalDate orderDate;
    @Column(name="shipping_name")
    private String shipping_name;
    @Column(name = "shipping_cost")
    private double shipping_cost;
    @Column(name="shipping_adress")
    private String adresse;
    @Column(name = "status")
    private OrderStatus status;
    @Column(name = "shippedAt")
    private LocalDate shippedAt;

    @OneToOne(mappedBy = "order" , fetch = FetchType.LAZY)
    private Payment payment;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch=FetchType.LAZY)
    private Cart cart;

    @OneToMany
    @JoinColumn(name="order_id")
    @Column(name = "lineitems" ,columnDefinition = "JSON")
    private List<LineItem> lineItems;

    public Order(String transaction_id, double total_price,List<LineItem> lineItems, String payment_method, String email, LocalDate orderDate, String shipping_name, String adresse) {
        this.transaction_id = transaction_id;
        this.total_price = total_price;
        this.lineItems=lineItems;
        this.payment_method = payment_method;
        this.email = email;
        this.orderDate = orderDate;
        this.shipping_name = shipping_name;
        this.adresse = adresse;
    }

/*@ManyToOne(fetch=FetchType.LAZY)
    private User user;*/


}
