package com.college.student_task_manager.service.implementation;

import com.college.student_task_manager.dto.AuthResponse;
import com.college.student_task_manager.dto.CreateTeacherRequest;
import com.college.student_task_manager.entity.User;
import com.college.student_task_manager.repository.UserRepository;
import com.college.student_task_manager.service.interfaces.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse createTeacher(
            CreateTeacherRequest request
    ) {

        String email = request.email()
                .trim()
                .toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(
                    "Email is already registered"
            );
        }

        User teacher = User.builder()
                .name(request.name().trim())
                .email(email)
                .password(
                        passwordEncoder.encode(
                                request.password()
                        )
                )
                .role(User.Role.TEACHER)
                .build();

        User savedTeacher = userRepository.save(teacher);

        return new AuthResponse(
                null,
                savedTeacher.getId(),
                savedTeacher.getName(),
                savedTeacher.getEmail(),
                savedTeacher.getRole()
        );
    }

    @Override
    public List<AuthResponse> getTeachers() {

        return userRepository
                .findByRole(User.Role.TEACHER)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public List<AuthResponse> getStudents() {

        return userRepository
                .findByRole(User.Role.STUDENT)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private AuthResponse toResponse(User user) {

        return new AuthResponse(
                null,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        );
    }
}