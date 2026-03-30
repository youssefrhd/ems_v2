package ems.project.ems_project.Services.ProdServiceImp;

import ems.project.ems_project.DTO.EmployeeDto;
import ems.project.ems_project.DTO.ProductDto;
import ems.project.ems_project.Exceptions.ResourceNotFound;
import ems.project.ems_project.Mapper.ProductMapper;
import ems.project.ems_project.Model.Product;
import ems.project.ems_project.Repository.ProductRepository;
import ems.project.ems_project.Services.ProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.apache.catalina.mapper.Mapper;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

@Service
@AllArgsConstructor

public class ProdServiceImp implements ProductService {
    private ProductRepository productRepository;

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        Product savedProd=productRepository.save(new ProductMapper().ProductDtoToProduct(productDto));
        return new ProductMapper().ProductToPDto(savedProd);
    }

    @Override
    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        productRepository.delete(product);

    }
    public ProductDto getProductById(Long id){
        Product fetchedProduct=productRepository.findById(id)
                .orElseThrow(()->new ResourceNotFound("the Product with id "+id+" is not found"));
        return new ProductMapper().ProductToPDto(fetchedProduct);
    }
    public List<ProductDto> getAllProducts(){
        return productRepository.findAll().stream().map((product) ->new ProductMapper().ProductToPDto(product)).sorted(Comparator.comparing(ProductDto::getInStock)).toList();
                //filter((pr)->pr.getInStock()>=20 && pr.getInStock()<=50)
    }
    public ProductDto updateProduct(Long id,ProductDto productDto){
        Product product=productRepository.findById(id)
                .orElseThrow(()->new ResourceNotFound("the given id : "+id+" is not found !"));
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setUnit_price(productDto.getUnit_price());
        Product savedProduct=productRepository.save(product);
        return new ProductMapper().ProductToPDto(savedProduct);
    }
    public ProductDto updateName(Long id,String name){
        Product product=productRepository.findById(id)
                .orElseThrow(()->new ResourceNotFound("the product with thid Id "+id+"id not found !"));
        product.setName(name);
        Product updatedPrd=productRepository.save(product);
        return new ProductMapper().ProductToPDto(updatedPrd);
    }

}
