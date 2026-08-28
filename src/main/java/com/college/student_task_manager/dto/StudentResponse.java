package com.college.student_task_manager.dto;

public record StudentResponse(
        Long id,
        String name,
        String email
) {
}