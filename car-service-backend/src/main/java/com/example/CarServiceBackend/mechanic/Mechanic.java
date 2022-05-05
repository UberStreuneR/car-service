package com.example.CarServiceBackend.mechanic;

import com.example.CarServiceBackend.order.Order;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table
public class Mechanic {
    @Id
    @SequenceGenerator(
            name = "mechanic_sequence",
            sequenceName = "mechanic_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "mechanic_sequence")
    private Long id;
    private String name;

    public Mechanic() {
    }

    public Mechanic(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
