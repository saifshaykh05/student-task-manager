package com.college.student_task_manager.service.implementation;

import com.college.student_task_manager.dto.TaskRequest;
import com.college.student_task_manager.dto.TaskResponse;
import com.college.student_task_manager.entity.Task;
import com.college.student_task_manager.entity.User;
import com.college.student_task_manager.repository.TaskRepository;
import com.college.student_task_manager.repository.UserRepository;
import com.college.student_task_manager.service.interfaces.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;


    @Override
    public TaskResponse createTask(
            TaskRequest request,
            String teacherEmail
    ) {

        User teacher = getUser(teacherEmail);

        if (teacher.getRole() != User.Role.TEACHER) {
            throw new IllegalArgumentException(
                    "Only teachers can create tasks"
            );
        }

        User student = userRepository.findById(
                request.assignedToId()
        ).orElseThrow(() ->
                new IllegalArgumentException("Student not found"));

        if (student.getRole() != User.Role.STUDENT) {
            throw new IllegalArgumentException(
                    "Task can only be assigned to a student"
            );
        }

        Task task = Task.builder()
                .title(request.title().trim())
                .description(request.description())
                .status(Task.Status.PENDING)
                .createdAt(LocalDateTime.now())
                .createdBy(teacher)
                .assignedTo(student)
                .deadline(request.deadline())
                .build();

        return toResponse(
                taskRepository.save(task)
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponse> getTeacherTasks(
            String teacherEmail
    ) {

        User teacher = getUser(teacherEmail);

        if (teacher.getRole() != User.Role.TEACHER) {
            throw new IllegalArgumentException(
                    "Only teachers can view teacher tasks"
            );
        }

        return taskRepository
                .findByCreatedByOrderByCreatedAtDesc(teacher)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // =========================
    // STUDENT
    // =========================

    @Override
    @Transactional(readOnly = true)
    public List<TaskResponse> getStudentTasks(
            String studentEmail,
            Task.Status status
    ) {

        User student = getUser(studentEmail);

        if (student.getRole() != User.Role.STUDENT) {
            throw new IllegalArgumentException(
                    "Only students can view assigned tasks"
            );
        }

        List<Task> tasks;

        if (status == null) {

            tasks = taskRepository
                    .findByAssignedToOrderByCreatedAtDesc(student);

        } else {

            tasks = taskRepository
                    .findByAssignedToAndStatusOrderByCreatedAtDesc(
                            student,
                            status
                    );
        }

        return tasks.stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TaskResponse getStudentTask(
            Long id,
            String studentEmail
    ) {

        User student = getUser(studentEmail);

        if (student.getRole() != User.Role.STUDENT) {
            throw new IllegalArgumentException(
                    "Only students can view assigned tasks"
            );
        }

        Task task = taskRepository
                .findByIdAndAssignedTo(id, student)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Task not found"
                        ));

        return toResponse(task);
    }

    @Override
    @Transactional
    public TaskResponse updateStudentTaskStatus(
            Long id,
            Task.Status status,
            String studentEmail
    ) {

        User student = getUser(studentEmail);

        if (student.getRole() != User.Role.STUDENT) {
            throw new IllegalArgumentException(
                    "Only students can update task status"
            );
        }

        Task task = taskRepository
                .findByIdAndAssignedTo(id, student)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Task not found"
                        ));

        task.setStatus(status);

        return toResponse(
                taskRepository.save(task)
        );
    }

    // =========================
    // HELPER METHODS
    // =========================

    private User getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "User not found"
                        ));
    }

    private TaskResponse toResponse(Task task) {

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreatedAt(),
                task.getAssignedTo().getId(),
                task.getAssignedTo().getName(),
                task.getDeadline()
        );
    }
}