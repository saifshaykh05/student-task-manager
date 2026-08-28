package com.college.student_task_manager.service.interfaces;

import com.college.student_task_manager.dto.TaskRequest;
import com.college.student_task_manager.dto.TaskResponse;
import com.college.student_task_manager.entity.Task;

import java.util.List;

public interface TaskService {

    // Teacher
    TaskResponse createTask(
            TaskRequest request,
            String teacherEmail
    );

    List<TaskResponse> getTeacherTasks(
            String teacherEmail
    );

    // Student
    List<TaskResponse> getStudentTasks(
            String studentEmail,
            Task.Status status
    );

    TaskResponse getStudentTask(
            Long id,
            String studentEmail
    );

    TaskResponse updateStudentTaskStatus(
            Long id,
            Task.Status status,
            String studentEmail
    );
}