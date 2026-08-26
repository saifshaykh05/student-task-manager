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

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public List<TaskResponse> getTasks(String email, Task.Status status) {

        User user = getUser(email);

        List<Task> tasks;

        if (status == null) {
            tasks = taskRepository.findByUserOrderByCreatedAtDesc(user);
        } else {
            tasks = taskRepository
                    .findByUserAndStatusOrderByCreatedAtDesc(user, status);
        }

        return tasks.stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public TaskResponse createTask(
            TaskRequest request,
            String email
    ) {

        User user = getUser(email);

        Task task = Task.builder()
                .title(request.title().trim())
                .description(request.description())
                .status(
                        request.status() == null
                                ? Task.Status.PENDING
                                : request.status()
                )
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        return toResponse(taskRepository.save(task));
    }

    @Override
    public TaskResponse updateTask(
            Long id,
            TaskRequest request,
            String email
    ) {

        User user = getUser(email);

        Task task = taskRepository.findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new IllegalArgumentException("Task not found"));

        task.setTitle(request.title().trim());
        task.setDescription(request.description());

        if (request.status() != null) {
            task.setStatus(request.status());
        }

        return toResponse(taskRepository.save(task));
    }

    @Override
    public TaskResponse updateStatus(
            Long id,
            Task.Status status,
            String email
    ) {

        User user = getUser(email);

        Task task = taskRepository.findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new IllegalArgumentException("Task not found"));

        task.setStatus(status);

        return toResponse(taskRepository.save(task));
    }

    @Override
    public void deleteTask(
            Long id,
            String email
    ) {

        User user = getUser(email);

        Task task = taskRepository.findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new IllegalArgumentException("Task not found"));

        taskRepository.delete(task);
    }

    private User getUser(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));
    }

    private TaskResponse toResponse(Task task) {

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreatedAt()
        );
    }
    @Override
    public TaskResponse getTask(Long id, String email) {

        User user = getUser(email);

        Task task = taskRepository.findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new IllegalArgumentException("Task not found"));

        return toResponse(task);
    }
}
