package com.college.student_task_manager.controller;

import com.college.student_task_manager.dto.TaskRequest;
import com.college.student_task_manager.dto.TaskResponse;
import com.college.student_task_manager.service.interfaces.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher/tasks")
@RequiredArgsConstructor
public class TeacherTaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @Valid @RequestBody TaskRequest request,
            Authentication authentication
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        taskService.createTask(
                                request,
                                authentication.getName()
                        )
                );
    }

    @GetMapping
    public List<TaskResponse> getTasks(
            Authentication authentication
    ) {

        return taskService.getTeacherTasks(
                authentication.getName()
        );
    }
}