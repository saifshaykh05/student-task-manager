package com.college.student_task_manager.repository;

import com.college.student_task_manager.entity.Task;
import com.college.student_task_manager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByCreatedByOrderByCreatedAtDesc(User teacher);

    List<Task> findByAssignedToOrderByCreatedAtDesc(User student);

    List<Task> findByAssignedToAndStatusOrderByCreatedAtDesc(
            User student,
            Task.Status status
    );

    Optional<Task> findByIdAndAssignedTo(
            Long id,
            User student
    );
}