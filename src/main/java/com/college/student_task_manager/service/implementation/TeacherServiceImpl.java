package com.college.student_task_manager.service.implementation;

import com.college.student_task_manager.dto.StudentResponse;
import com.college.student_task_manager.entity.User;
import com.college.student_task_manager.repository.UserRepository;
import com.college.student_task_manager.service.interfaces.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final UserRepository userRepository;

    @Override
    public List<StudentResponse> getStudents(String teacherEmail) {

        User teacher = userRepository.findByEmail(teacherEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException("Teacher not found"));

        if (teacher.getRole() != User.Role.TEACHER) {
            throw new IllegalArgumentException(
                    "Only teachers can view students"
            );
        }

        return userRepository
                .findByRole(User.Role.STUDENT)
                .stream()
                .map(student -> new StudentResponse(
                        student.getId(),
                        student.getName(),
                        student.getEmail()
                ))
                .toList();
    }
}