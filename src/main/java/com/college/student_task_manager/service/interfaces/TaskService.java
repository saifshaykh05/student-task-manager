package com.college.student_task_manager.service.interfaces;

import com.college.student_task_manager.dto.TaskRequest;
import com.college.student_task_manager.dto.TaskResponse;
import com.college.student_task_manager.entity.Task;

import java.util.List;

public interface TaskService {

    List<TaskResponse> getTasks(String email, Task.Status status);

    TaskResponse createTask(
            TaskRequest request,
            String email
    );

    TaskResponse updateTask(
            Long id,
            TaskRequest request,
            String email
    );

    TaskResponse updateStatus(
            Long id,
            Task.Status status,
            String email
    );

    void deleteTask(
            Long id,
            String email
    );
    TaskResponse getTask(Long id, String email);
}