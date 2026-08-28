package com.college.student_task_manager.controller;

import com.college.student_task_manager.dto.AuthResponse;
import com.college.student_task_manager.dto.CreateTeacherRequest;
import com.college.student_task_manager.service.interfaces.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/teachers")
    public ResponseEntity<AuthResponse> createTeacher(
            @Valid @RequestBody CreateTeacherRequest request
    ) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        adminService.createTeacher(request)
                );
    }

    @GetMapping("/teachers")
    public List<AuthResponse> getTeachers() {

        return adminService.getTeachers();
    }

    @GetMapping("/students")
    public List<AuthResponse> getStudents() {

        return adminService.getStudents();
    }
}