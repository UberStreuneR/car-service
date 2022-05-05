package com.example.CarServiceBackend.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findByName(String name);

//    @Query("select t from Task where task.student = (select s from Student where student.id = ?1)")
//    List<Task> findTasksForStudentId(Long studentId);
//    List<Task> findTasksByClientId(Long clientId);
}
