package com.college.student_task_manager.dto;

public record AuthResponse(
        String token,
        Long userId,
        String name,
        String email
) {
}