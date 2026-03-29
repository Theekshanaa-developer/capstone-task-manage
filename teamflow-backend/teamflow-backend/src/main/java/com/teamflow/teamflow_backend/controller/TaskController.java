package com.teamflow.teamflow_backend.controller;

import com.teamflow.teamflow_backend.entity.Task;
import com.teamflow.teamflow_backend.entity.TaskStatus;
import com.teamflow.teamflow_backend.entity.User;
import com.teamflow.teamflow_backend.repository.TaskRepository;
import com.teamflow.teamflow_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class TaskController {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    // Create Task
    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        taskRepository.save(task);
        return ResponseEntity.ok(task);
    }

    // Get all tasks
    @GetMapping
    public List<Task> getTasks(
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) Long assignedTo) {

        if (status != null && assignedTo != null) {
            return taskRepository.findByStatusAndAssignedToId(status, assignedTo);
        } else if (status != null) {
            return taskRepository.findByStatus(status);
        } else if (assignedTo != null) {
            return taskRepository.findByAssignedToId(assignedTo);
        } else {
            return taskRepository.findAll();
        }
    }

    // Get single task
    @GetMapping("/{id}")
    public ResponseEntity<?> getTask(@PathVariable Long id) {

        System.out.println("Fetching ID: " + id);

        return taskRepository.findById(id)
                .map(task -> {
                    System.out.println("Task FOUND");
                    return ResponseEntity.ok(task);
                })
                .orElseGet(() -> {
                    System.out.println("Task NOT FOUND");
                    return ResponseEntity.notFound().build();
                });
    }

    // Update task
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(
            @PathVariable Long id,
            @RequestBody Task updatedTask) {

        System.out.println("Incoming ID: " + id);

        return taskRepository.findById(id).map(task -> {
            System.out.println("Task FOUND in DB");

            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setStatus(updatedTask.getStatus());
            task.setUpdatedAt(LocalDateTime.now());

            taskRepository.save(task);
            return ResponseEntity.ok(task);

        }).orElseGet(() -> {
            System.out.println("Task NOT FOUND");
            return ResponseEntity.notFound().build();
        });
    }

    // Delete task
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        return taskRepository.findById(id).map(task -> {
            taskRepository.delete(task);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/test")
    public String test() {
        return "Controller working";
    }
}