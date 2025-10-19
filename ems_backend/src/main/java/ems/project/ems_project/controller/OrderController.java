package ems.project.ems_project.controller;

import com.sun.mail.iap.Response;
import ems.project.ems_project.Model.Order;
import ems.project.ems_project.Model.User;
import ems.project.ems_project.Repository.UserRepository;
import ems.project.ems_project.Services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/saveOrder")
    public ResponseEntity<?> saveOrder(@RequestBody Order order ){
        try {
            orderService.saveOrder(order);
            System.out.println("line items"+order.getLineItems());
            return ResponseEntity.ok("Order saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error saving order: " + e.getMessage());
        }
    }
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getOrders(){
        List<Order> orders=orderService.getOrders();
        return ResponseEntity.ok(orders);
    }
}
