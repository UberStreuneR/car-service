package com.example.CarServiceBackend.client;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ClientConfig {

    @Bean
    CommandLineRunner commandLineRunner(ClientRepository repository) {
        return null;
//        return args -> {
//            Student mariam = new Student(
//                    "Mariam",
//                    LocalDate.of(2000, Month.JANUARY, 5),
//                    "mariam@gmail.com");
//            Student john = new Student(
//                    "John",
//                    LocalDate.of(1998, Month.JANUARY, 5),
//                    "john@gmail.com");
//            repository.saveAll(List.of(mariam, john));
//        };
    }
}
