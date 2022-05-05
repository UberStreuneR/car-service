package com.example.CarServiceBackend.order;

import com.example.CarServiceBackend.client.Client;
import com.example.CarServiceBackend.mechanic.Mechanic;
import com.example.CarServiceBackend.task.Task;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="order_table")
public class Order {
    @Id
    @SequenceGenerator(
            name = "order_sequence",
            sequenceName = "order_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_sequence")
    private Long id;

    @ManyToOne
    private Mechanic mechanic;

    @ManyToOne
    private Client client;

    @ManyToMany
    private List<Task> tasks = new ArrayList<>();

    private LocalDate date;
    private boolean fulfilled;
    public Order() {
    }

    public Order(List<Task> tasks, Client client, boolean fulfilled) {
        this.tasks = tasks;
        this.client = client;
        this.date = LocalDate.now();
        this.fulfilled = fulfilled;
    }

//    public Order(Client client){
//        this.client = client;
//        this.fulfilled = false;
//        this.date = LocalDate.now();
//    }

    public Mechanic getMechanic() {
        return mechanic;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMechanic(Mechanic mechanic) {
        this.mechanic = mechanic;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public void addTasks(List<Task> tasks) {
        this.tasks.addAll(tasks);
    }

    public void addTask(Task task) {this.tasks.add(task);}

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public boolean isFulfilled() {
        return fulfilled;
    }

    public void setFulfilled(boolean fulfilled) {
        this.fulfilled = fulfilled;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", mechanic=" + mechanic +
                ", client=" + client +
                ", tasks=" + tasks +
                ", date=" + date +
                ", fulfilled=" + fulfilled +
                '}';
    }
}
