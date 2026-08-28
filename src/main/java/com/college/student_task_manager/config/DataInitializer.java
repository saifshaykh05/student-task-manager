package com.college.student_task_manager.config;

import com.college.student_task_manager.entity.User;
import com.college.student_task_manager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.teacher.email}")
    private String teacherEmail;

    @Value("${app.teacher.password}")
    private String teacherPassword;

    @Value("${app.teacher.name}")
    private String teacherName;

    @Override
    public void run(String... args) {

        if (userRepository.existsByEmail(teacherEmail)) {
            return;
        }

        User teacher = User.builder()
                .name(teacherName)
                .email(teacherEmail)
                .password(passwordEncoder.encode(teacherPassword))
                .role(User.Role.TEACHER)
                .build();

        userRepository.save(teacher);

        System.out.println("Default teacher account created.");
    }
}
