package com.example.CarServiceBackend.task;

import com.example.CarServiceBackend.order.Order;
import com.example.CarServiceBackend.order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final OrderRepository orderRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, OrderRepository orderRepository) {
        this.taskRepository = taskRepository;
        this.orderRepository = orderRepository;
    }

    public List<Task> getTasks() {
        return taskRepository.findAll();
    }

//    public List<Task> findTasksByClientId(Long clientId) {
//        return taskRepository.findTasksByClientId(clientId);
//    }



    public void addNewTask(Task task) {
        Optional<Task> optionalTask = taskRepository.findByName(task.getName());
        if (optionalTask.isPresent()) {
            throw new IllegalStateException("The task with id " + task.getId() + " is already designated.");
        }
        taskRepository.save(task);
    }

    public void addTaskToOrder(Task task, Long orderId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            // Task is already present in the db
            Order order = optionalOrder.get();
            order.addTasks(List.of(task));
        }

    }

}
