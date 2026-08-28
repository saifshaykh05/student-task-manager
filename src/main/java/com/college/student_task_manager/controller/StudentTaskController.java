package com.college.student_task_manager.controller;

import com.college.student_task_manager.dto.TaskResponse;
import com.college.student_task_manager.entity.Task;
import com.college.student_task_manager.service.interfaces.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/tasks")
@RequiredArgsConstructor
public class StudentTaskController {

    private final TaskService taskService;

    @GetMapping
    public List<TaskResponse> getTasks(
            @RequestParam(required = false) Task.Status status,
            Authentication authentication
    ) {

        return taskService.getStudentTasks(
                authentication.getName(),
                status
        );
    }

    @GetMapping("/{id}")
    public TaskResponse getTask(
            @PathVariable Long id,
            Authentication authentication
    ) {

        return taskService.getStudentTask(
                id,
                authentication.getName()
        );
    }

    @PatchMapping("/{id}/status")
    public TaskResponse updateStatus(
            @PathVariable Long id,
            @RequestParam Task.Status status,
            Authentication authentication
    ) {

        return taskService.updateStudentTaskStatus(
                id,
                status,
                authentication.getName()
        );
    }
}