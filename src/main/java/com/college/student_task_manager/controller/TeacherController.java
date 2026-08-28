package com.college.student_task_manager.controller;

import com.college.student_task_manager.dto.StudentResponse;
import com.college.student_task_manager.service.interfaces.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @GetMapping("/students")
    public List<StudentResponse> getStudents(
            Authentication authentication
    ) {

        return teacherService.getStudents(
                authentication.getName()
        );
    }
}