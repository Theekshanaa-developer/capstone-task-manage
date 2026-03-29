package com.teamflow.teamflow_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo; // nullable

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = true)
    private User createdBy;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}