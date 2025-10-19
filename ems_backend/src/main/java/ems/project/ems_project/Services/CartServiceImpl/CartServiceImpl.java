package ems.project.ems_project.Services.CartServiceImpl;

import ems.project.ems_project.DTO.LineItemDTO;
import ems.project.ems_project.Exceptions.ResourceNotFound;
import ems.project.ems_project.Mapper.LineItemMapper;
import ems.project.ems_project.Model.LineItem;
import ems.project.ems_project.Model.Product;
import ems.project.ems_project.Repository.LineItemRepository;
import ems.project.ems_project.Repository.ProductRepository;
import ems.project.ems_project.Services.CartService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
    private LineItemRepository lineItemRepository;
    private ProductRepository productRepository;
    public LineItemDTO addToCart(Long productId) {
        Product product=productRepository.findById(productId).orElseThrow(()->new ResourceNotFound("it's no Product with the given ID"));
        LineItem LineItm =new LineItem(0,product);
        LineItem savedItem=lineItemRepository.save(LineItm);
        return new LineItemMapper().LinItemToDTO(savedItem);
    }
    public LineItemDTO addToCart(Long productId , int quantity) {
        Product product=productRepository.findById(productId).orElseThrow(()->new ResourceNotFound("it's no Product with the given ID"));
        LineItem LineItm =new LineItem(quantity,product);
        LineItem savedItem=lineItemRepository.save(LineItm);
        return new LineItemMapper().LinItemToDTO(savedItem);
    }
    public void removeFromCart(Long id){
        lineItemRepository.deleteById(id);
    }
    public List<LineItemDTO> getAllItems(){
        return lineItemRepository.findAll().stream().map(lineItem -> new LineItemMapper().LinItemToDTO(lineItem)).toList();
    }
    public void clearCart(){
        lineItemRepository.deleteAll();
    }
    public void updateQuantity(Long id,int Quantity){
        LineItem item=lineItemRepository.findById(id)
                .orElseThrow(()->new ResourceNotFound("the Cart isn't found !"));
        if(Quantity<item.getProduct().getInStock() && Quantity!=0){
            item.setQuantity(Quantity);
            lineItemRepository.save(item);
        }
        else lineItemRepository.deleteById(id);
    }
    public double getSubTotal(){
        return lineItemRepository.findAll().stream().map(lineItem -> lineItem.getProduct().getUpdatedPrice()*lineItem.getQuantity()).reduce(0.00,Double::sum);
    }
}
