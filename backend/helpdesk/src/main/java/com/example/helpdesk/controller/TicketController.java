package com.example.helpdesk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.helpdesk.model.Ticket;
import com.example.helpdesk.repository.TicketRepository;
import com.example.helpdesk.service.AiTriageService;
import com.example.helpdesk.service.NotificationService;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "http://localhost:5173")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private AiTriageService aiTriageService;

    @Autowired
    private NotificationService notificationService;

    // Get all tickets for Agent dashboard
    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // Customer creates ticket -> AI triages -> Broadcasts via SSE
    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) {
        // 1. Run AI Analysis
        aiTriageService.analyzeTicketWithAI(ticket);

        // 2. Save to MySQL
        Ticket savedTicket = ticketRepository.save(ticket);

        // 3. Push Real-Time SSE alert to online support agents
        notificationService.broadcastNewTicket(savedTicket);

        return ResponseEntity.ok(savedTicket);
    }

    // Agent connects to SSE Live Stream
    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(@RequestParam("token") String token) {
        return notificationService.subscribe();
    }
}