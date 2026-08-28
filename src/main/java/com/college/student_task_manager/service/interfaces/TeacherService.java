package com.college.student_task_manager.service.interfaces;

import com.college.student_task_manager.dto.StudentResponse;

import java.util.List;

public interface TeacherService {

    List<StudentResponse> getStudents(String teacherEmail);
}