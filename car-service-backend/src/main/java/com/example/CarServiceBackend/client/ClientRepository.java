package com.example.CarServiceBackend.client;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> { //Long because Student's id is Long

//    @Query("SELECT s FROM Student s WHERE s.email = ?1")
    Optional<Client> findClientByEmail(String email);

}
