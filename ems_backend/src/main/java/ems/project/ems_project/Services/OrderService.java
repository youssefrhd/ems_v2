package ems.project.ems_project.Services;

import ems.project.ems_project.DTO.LineItemDTO;
import ems.project.ems_project.Model.LineItem;
import ems.project.ems_project.Model.Order;
import ems.project.ems_project.Model.User;
import ems.project.ems_project.Repository.LineItemRepository;
import ems.project.ems_project.Repository.OrderRepository;
import ems.project.ems_project.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private final OrderRepository orderRepository;

    private  UserRepository userRepository;

    private final LineItemRepository lineItemRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, LineItemRepository lineItemRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.lineItemRepository = lineItemRepository;
    }

    public void saveOrder(Order order){
        try{
            if (order.getLineItems() == null || order.getLineItems().isEmpty()) {
                throw new IllegalArgumentException("Order must have at least one line item");
            }
            orderRepository.save(order);
            List<LineItem> li=order.getLineItems();
            li.stream().forEach(l->l.setOrder(order));
            li.stream().forEach(l->lineItemRepository.save(l));


        }catch(RuntimeException e){
            throw new RuntimeException("The Order can not be saved : "+e);
        }

    }

    public List<Order> getOrders(){
        try{
            return orderRepository.getOrders();
        }catch (RuntimeException e){
            throw new RuntimeException("Orders can not be retrieved"+e);
        }
    }
}
