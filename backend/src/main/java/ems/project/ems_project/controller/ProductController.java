package ems.project.ems_project.controller;

import ems.project.ems_project.DTO.ProductDto;
import ems.project.ems_project.Model.Product;
import ems.project.ems_project.Services.ProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor
@RequestMapping("/api/products")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    private ProductService productService;
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto){
        ProductDto savedProduct=productService.createProduct(productDto);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @GetMapping("/searchProduct/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id){
        ProductDto fetchedPrd=productService.getProductById(id);
        return ResponseEntity.ok(fetchedPrd);
    }
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        List<ProductDto> products =productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    /*public String getAlllProduct(Model model){
        model.addAttribute("products",productService.getAllProducts());
        return "products";
    }*/

    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id,@RequestBody ProductDto productDto){
        ProductDto updatedProduct= productService.updateProduct(id, productDto);
        return ResponseEntity.ok(updatedProduct);
    }
    @PutMapping("/updatename/{id}")
    public ResponseEntity<ProductDto> updatePassword(@PathVariable Long id,@RequestBody String newPname){
        ProductDto updated=productService.updateName(id,newPname);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/deleteProduct")
    public void deleteProduct(@RequestParam Long id){
        try {
            productService.deleteProduct(id);
        } catch (EntityNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Product not found with id: " + id);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Failed to delete product: " + e.getMessage());
        }


    }



}
