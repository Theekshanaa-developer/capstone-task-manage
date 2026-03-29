package com.teamflow.teamflow_backend.repository;

import com.teamflow.teamflow_backend.entity.Task;
import com.teamflow.teamflow_backend.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {


    List<Task> findByStatus(TaskStatus status);


    List<Task> findByAssignedToId(Long userId);

    List<Task> findByStatusAndAssignedToId(TaskStatus status, Long userId);
}