package com.college.student_task_manager.controller;

import com.college.student_task_manager.dto.AuthResponse;
import com.college.student_task_manager.dto.LoginRequest;
import com.college.student_task_manager.dto.RegisterRequest;
import com.college.student_task_manager.dto.StdResponse;
import com.college.student_task_manager.service.interfaces.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<StdResponse<Void>> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        authService.register(request);
        StdResponse<Void> response=new StdResponse<>(true,"User Registered Successfully ",null);
        return ResponseEntity
                .status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody LoginRequest request
    ) {

        return authService.login(request);
    }
}
