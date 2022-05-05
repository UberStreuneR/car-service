package com.example.CarServiceBackend.order;

import com.example.CarServiceBackend.client.Client;
import com.example.CarServiceBackend.client.ClientService;
import com.example.CarServiceBackend.mechanic.Mechanic;
import com.example.CarServiceBackend.mechanic.MechanicService;
import com.example.CarServiceBackend.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path="api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService, ClientService clientService, TaskService taskService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getOrders() {return orderService.getOrders();}

    @GetMapping(path="{orderId}")
    public Order getOrderById(@PathVariable("orderId") Long orderId) {return orderService.getOrderById(orderId);}

    @GetMapping(path="byClientId/{clientId}")
    public List<Order> getOrdersByClientId(@PathVariable("clientId") Long clientId) {return orderService.getOrdersByClientId(clientId);}

    @GetMapping(path="byMechanicId/{mechanicId}")
    public List<Order> getOrdersByMechanicId(@PathVariable("mechanicId") Long mechanicId) {return orderService.getOrdersByMechanicId(mechanicId);}

    @PostMapping
    public void addNewOrder(@RequestBody Order order) {orderService.addNewOrder(order);}

    @PostMapping(path="addNewOrderForClientId/{clientId}")
    public void addNewOrderForClientId(@RequestBody List<Long> taskIds, @PathVariable("clientId") Long clientId){
        orderService.addNewOrderForClientId(clientId, taskIds);
    }

    @PostMapping(path="addEmptyOrder")
    public void addEmptyOrder(){
        orderService.addEmptyOrder();
    }

    @PutMapping(path="addTaskIdsToOrder/{orderId}")
    public void addTasksToOrder(@RequestBody List<Long> taskIds, @PathVariable("orderId") Long orderId){
        orderService.addTasksToOrder(taskIds, orderId);
    }
}
