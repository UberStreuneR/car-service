package com.example.CarServiceBackend.order;

import com.example.CarServiceBackend.client.Client;
import com.example.CarServiceBackend.client.ClientRepository;
import com.example.CarServiceBackend.mechanic.Mechanic;
import com.example.CarServiceBackend.task.Task;
import com.example.CarServiceBackend.task.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final TaskRepository taskRepository;
    private final ClientRepository clientRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, TaskRepository taskRepository, ClientRepository clientRepository) {
        this.orderRepository = orderRepository;
        this.taskRepository = taskRepository;
        this.clientRepository= clientRepository;
    }

    public List<Order> getOrders() {return orderRepository.findAll();};

    public Order getOrderById(Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            return optionalOrder.get();
        }
        throw new IllegalStateException("No order with such id exists");
    }

    public List<Order> getOrdersByClientId(Long clientId) {return orderRepository.findOrdersByClientId(clientId);}

    public List<Order> getOrdersByMechanicId(Long mechanicId) {return orderRepository.findOrdersByMechanicId(mechanicId);}

    public void addNewOrder(Order order) {
        orderRepository.save(order);
    }

    public Order addEmptyOrder() {
        Order order = new Order();
        addNewOrder(order);
        return order;
    }

    public void addNewOrderForClientId(Long clientId, List<Long> taskIds) {
        System.out.println("______________________________________________________________________________________");
        Optional<Client> optionalClient = clientRepository.findById(clientId);
        if (optionalClient.isPresent()) {
            List<Task> tasksToAdd = new ArrayList<Task>();
            for (int i = 0; i < taskIds.size(); i++) {
                Optional<Task> optionalTask = taskRepository.findById(taskIds.get(i));
                if (optionalTask.isPresent()) {
                    tasksToAdd.add(optionalTask.get());
                }
            }
            Order newOrder = new Order(tasksToAdd, optionalClient.get(), false);

            System.out.println("__________________");
            System.out.println(newOrder.toString());
            System.out.println("__________________");
            orderRepository.saveAll(List.of(newOrder));
//            addNewOrder(newOrder);
        }
    }


    @Transactional
    public void addTasksToOrder(List<Long> taskIds, Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new IllegalStateException("Order with id " + orderId + " does not exist"));;
        List<Task> tasksToAdd = new ArrayList<Task>();
        for (int i = 0; i < taskIds.size(); i++) {
            Optional<Task> optionalTask = taskRepository.findById(taskIds.get(i));
            optionalTask.ifPresent(tasksToAdd::add);
        }
        order.addTasks(tasksToAdd);
    }
}
