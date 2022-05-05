package com.example.CarServiceBackend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path="api/tasks")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getTasks();
    }

//    @GetMapping(path="{clientId}")
//    public List<Task> getTasksForStudentId(@PathVariable("clientId") Long clientId) {
//        return taskService.findTasksByClientId(clientId);
//    }

    // For creating a task from UI
    @PostMapping
    public void addNewTask(@RequestBody Task task) { taskService.addNewTask(task);}

    @PatchMapping(path="addToOrder/{orderId}")
    public void addTaskToOrder(@RequestBody Task task, @PathVariable("orderId") Long orderId){taskService.addTaskToOrder(task, orderId);};
}
