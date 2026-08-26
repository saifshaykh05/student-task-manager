package com.college.student_task_manager.dto;

import com.college.student_task_manager.entity.Task;

import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        String title,
        String description,
        Task.Status status,
        LocalDateTime createdAt
) {
}