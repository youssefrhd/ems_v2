package ems.project.ems_project.controller;

import ems.project.ems_project.DTO.LineItemDTO;
import ems.project.ems_project.Repository.LineItemRepository;
import ems.project.ems_project.Services.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/Cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {
    private CartService cartService;

    @PostMapping("/addToCart/{id}")
    public ResponseEntity<LineItemDTO> addToCart(@PathVariable Long id){
        return new ResponseEntity<>(cartService.addToCart(id), HttpStatus.CREATED);
    }
    @PostMapping("/addToCart/{id}&{quantity}")
    public ResponseEntity<LineItemDTO> addToCart(@PathVariable Long id , @PathVariable int quantity){
        return new ResponseEntity<>(cartService.addToCart(id), HttpStatus.CREATED);
    }
    @DeleteMapping("/removeItem/{id}")
    public void removeFromCart(@PathVariable Long id){
        cartService.removeFromCart(id);
    }
    @GetMapping
    public ResponseEntity<List<LineItemDTO>> getAllItems(){
        return ResponseEntity.ok(cartService.getAllItems());
    }
    @DeleteMapping
    public void clearCart(){
        cartService.clearCart();
    }
    @PutMapping("/updateQuantity/{id}/{Quantity}")
    public ResponseEntity<String> updateQuantity(@PathVariable Long id, @PathVariable int Quantity){
        cartService.updateQuantity(id, Quantity);
        return ResponseEntity.ok("Cart item quantity updated");
    }
    @GetMapping("/subTotal")
    public ResponseEntity<Double> getSubTotal(){
        return ResponseEntity.ok(cartService.getSubTotal());
    }


}
