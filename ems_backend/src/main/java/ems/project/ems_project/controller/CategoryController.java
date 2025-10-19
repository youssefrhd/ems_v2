package ems.project.ems_project.controller;

import ems.project.ems_project.DTO.CategoryCountDto;
import ems.project.ems_project.Repository.CategoryCountProjection;
import ems.project.ems_project.Repository.ProductRepository;
import ems.project.ems_project.Services.CategoryService;
import ems.project.ems_project.Services.ProductService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;


    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/counts")
    public ResponseEntity<List<CategoryCountProjection>> getCategoryCounts() {
        return ResponseEntity.ok(categoryService.getCountCategory());
    }

}
