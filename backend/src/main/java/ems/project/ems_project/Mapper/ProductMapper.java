package ems.project.ems_project.Mapper;

import ems.project.ems_project.DTO.ProductDto;
import ems.project.ems_project.Model.Product;

public class ProductMapper {
    public ProductDto ProductToPDto(Product product){
        return new ProductDto(product.getProduct_id(),product.getName(),product.getDescription(),product.getUnit_price(),product.getInStock(),product.getCategory(), product.getPhoto(), product.getDiscount());
    }
    public Product ProductDtoToProduct(ProductDto productDto){
        return new Product(productDto.getProduct_id(),productDto.getName(),productDto.getDescription(),productDto.getUnit_price(),productDto.getInStock(),productDto.getPhoto(),productDto.getCategory(),productDto.getDiscount());
    }
}
