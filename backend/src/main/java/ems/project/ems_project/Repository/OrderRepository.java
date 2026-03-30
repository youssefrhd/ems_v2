package ems.project.ems_project.Repository;

import ems.project.ems_project.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    @Query("SELECT o FROM Order o LEFT JOIN FETCH LineItem li ON o.order_id = li.order.order_id ")
    List<Order> getOrders();
}
