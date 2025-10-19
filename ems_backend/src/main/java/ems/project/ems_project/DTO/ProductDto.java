package ems.project.ems_project.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductDto {
    private Long product_id;
    private String name;
    private String Description;
    private double unit_price;
    private int inStock;
    private String category;
    private String photo;
    private Integer discount;
}
