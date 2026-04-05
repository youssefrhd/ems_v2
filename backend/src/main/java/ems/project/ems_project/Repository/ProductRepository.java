package ems.project.ems_project.Repository;

import ems.project.ems_project.DTO.CategoryCountDto;
import ems.project.ems_project.Model.Product;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query("SELECT p.category as category, COUNT(p) as count FROM Product p GROUP BY p.category")
    List<CategoryCountProjection> countProductsByCategory();


}

