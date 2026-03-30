package ems.project.ems_project.Services;

import ems.project.ems_project.DTO.LineItemDTO;

import java.util.List;

public interface CartService {
    public LineItemDTO addToCart(Long productId);
    public LineItemDTO addToCart(Long productId , int quantity);
    public void removeFromCart(Long id);
    public List<LineItemDTO> getAllItems();
    public void clearCart();
    public void updateQuantity(Long id,int Quantity);
    public double getSubTotal();
}
