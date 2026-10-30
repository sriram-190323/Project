package com.example.helpdesk.dto;

public class TicketRequest {
    private String title;
    private String description;

    // Default Constructor
    public TicketRequest() {}

    // Constructor with fields
    public TicketRequest(String title, String description) {
        this.title = title;
        this.description = description;
    }

    // Getters and Setters
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
}