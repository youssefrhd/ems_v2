package ems.project.ems_project.Services;

import ems.project.ems_project.DTO.CategoryCountDto;
import ems.project.ems_project.Repository.CategoryCountProjection;
import ems.project.ems_project.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final ProductRepository productRepository;

    public CategoryService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<CategoryCountProjection> getCountCategory(){
        return productRepository.countProductsByCategory();
    }
}
