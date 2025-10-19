package ems.project.ems_project.Services;

import ems.project.ems_project.DTO.ProductDto;
import ems.project.ems_project.Model.Product;
import ems.project.ems_project.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductService {
    public ProductDto createProduct(ProductDto productDto);
    public void deleteProduct(Long productId);
    public ProductDto getProductById(Long id);
    public List<ProductDto> getAllProducts();
    public ProductDto updateProduct(Long id,ProductDto productDto);

    public ProductDto updateName(Long id,String name);


}
