package ems.project.ems_project.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "product")

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long product_id;
    @Column(name="productname")
    private String name;
    @Column(name = "description" )
    private String Description;

    @Column(name = "unit_price")
    private double unit_price;
    @Column(name = "instock")
    private int inStock;
    @Column(name = "photo")
    private String photo;
    @Column(name = "discount")
    private Integer discount;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cart cart;


    @Column(name = "category")
    private String category;

    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY)
    private List<LineItem> lineItems;


    public Product(Long product_id, String name, String description, double unit_price, int inStock, String photo,String category ,int discount ) {
        this.product_id = product_id;
        this.name = name;
        Description = description;
        this.unit_price = unit_price;
        this.inStock = inStock;
        this.category = category;
        this.photo=photo;
        this.discount=discount;

    }
    public double getUpdatedPrice() {
        if (this.discount != null) {
            return unit_price - (unit_price * discount / 100.0);
        } else {
            return unit_price;  // Return the unit price if discount is not set
        }
    }
}
