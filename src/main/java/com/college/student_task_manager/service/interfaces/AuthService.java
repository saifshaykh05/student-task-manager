package com.college.student_task_manager.service.interfaces;

import com.college.student_task_manager.dto.AuthResponse;
import com.college.student_task_manager.dto.LoginRequest;
import com.college.student_task_manager.dto.RegisterRequest;

public interface AuthService {

    void register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
