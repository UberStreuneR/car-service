package com.example.CarServiceBackend.task;

import com.example.CarServiceBackend.client.Client;
import com.example.CarServiceBackend.client.ClientRepository;
import com.example.CarServiceBackend.mechanic.Mechanic;
import com.example.CarServiceBackend.mechanic.MechanicRepository;
import com.example.CarServiceBackend.order.Order;
import com.example.CarServiceBackend.order.OrderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Configuration
public class TaskConfig {

    @Bean
    CommandLineRunner commandLineRunnerTasks(TaskRepository taskRepository,
                                             ClientRepository clientRepository,
                                             MechanicRepository mechanicRepository,
                                             OrderRepository orderRepository) {
        return args -> {
            Client mariam = new Client(
                    "Mariam",
                    LocalDate.of(2000, Month.JANUARY, 5),
                    "mariam@gmail.com");
            Client john = new Client(
                    "John",
                    LocalDate.of(1998, Month.JANUARY, 5),
                    "john@gmail.com");
            Task suspension = new Task("Fix suspension", 1000, "We fix suspensions immediately. Our mechanics ensure the reliability of the service.");
            Task changeOil = new Task("Change oil", 70, "Car got rusty? Highest quality oil will replace your old one.");
            Task changeTires = new Task("Change tires", 150, "Switch tires from winter to summer. Cost per 4 tires.");
            Task upgradeEngine = new Task("Upgrade engine to stage 2", 10000, "Upgrading your vehicle engine to stage 2. This may take a while.");

            Mechanic Dominic = new Mechanic("Dominic Toretto");
            Mechanic Brian = new Mechanic("Brian O'Conner");
//            Order mariamsOrder = new Order(List.of(suspension, changeOil), mariam, false);
            Order mariamsOrder = new Order();
            mariamsOrder.addTasks(List.of(suspension, changeOil));
            List<Task> tasksToAdd = new ArrayList<Task>();
            List<Long> taskIds = new ArrayList<Long>(Arrays.asList(1L, 2L));
            for (int i = 0; i < taskIds.size(); i++) {
                Optional<Task> optionalTask = taskRepository.findById(taskIds.get(i));
                optionalTask.ifPresent(tasksToAdd::add);
            }
            mariamsOrder.addTasks(tasksToAdd);
            mariamsOrder.setClient(mariam);
            mariamsOrder.setFulfilled(false);
            mariamsOrder.setMechanic(Dominic);
            Order mariamsOrder2 = new Order(List.of(changeTires, upgradeEngine), mariam, false);

            System.out.println("_____________");
            System.out.println(mariamsOrder2.toString());
            System.out.println("_____________");

            mechanicRepository.saveAll(List.of(Dominic, Brian));
            clientRepository.saveAll(List.of(mariam, john));
            taskRepository.saveAll(List.of(suspension, changeOil, changeTires, upgradeEngine));
            orderRepository.saveAll(List.of(mariamsOrder, mariamsOrder2));
        };
    }
}
