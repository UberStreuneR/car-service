package com.example.CarServiceBackend.order;

import com.example.CarServiceBackend.mechanic.Mechanic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findOrdersByClientId(Long clientId);
    List<Order> findOrdersByMechanicId(Long mechanicId);
}
