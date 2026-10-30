package com.example.helpdesk.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    private String status = "OPEN";

    private String aiPriority;
    private String aiSentiment;

    private String createdBy;
    private LocalDateTime createdAt = LocalDateTime.now();

    // Default Constructor
    public Ticket() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAiPriority() {
        return aiPriority;
    }

    public void setAiPriority(String aiPriority) {
        this.aiPriority = aiPriority;
    }

    public String getAiSentiment() {
        return aiSentiment;
    }

    public void setAiSentiment(String aiSentiment) {
        this.aiSentiment = aiSentiment;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}