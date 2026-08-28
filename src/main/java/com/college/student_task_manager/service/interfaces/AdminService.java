package com.college.student_task_manager.service.interfaces;

import com.college.student_task_manager.dto.AuthResponse;
import com.college.student_task_manager.dto.CreateTeacherRequest;

import java.util.List;

public interface AdminService {

    AuthResponse createTeacher(CreateTeacherRequest request);

    List<AuthResponse> getTeachers();

    List<AuthResponse> getStudents();
}