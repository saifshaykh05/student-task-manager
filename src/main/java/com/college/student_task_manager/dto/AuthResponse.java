package com.college.student_task_manager.dto;

import com.college.student_task_manager.entity.User;

public record AuthResponse(

        String token,

        Long userId,

        String name,

        String email,

        User.Role role

) {
}