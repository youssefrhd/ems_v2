package ems.project.ems_project.DTO;

import ems.project.ems_project.Model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter

public class LineItemDTO {
    private Long id;
    private int quantity;
    private Product product;
}
