package com.example.helpdesk.service;

import com.example.helpdesk.model.Ticket;
import org.springframework.stereotype.Service;

@Service
public class AiTriageService {

    public void analyzeTicketWithAI(Ticket ticket) {
        String text = (ticket.getTitle() + " " + ticket.getDescription()).toLowerCase();

        // Simulated AI heuristics (Can be replaced with OpenAI/Spring AI API call)
        if (text.contains("down") || text.contains("urgent") || text.contains("fail") || text.contains("crash") || text.contains("error")) {
            ticket.setAiPriority("HIGH");
            ticket.setAiSentiment("Angry / Stressed");
        } else if (text.contains("slow") || text.contains("issue") || text.contains("problem")) {
            ticket.setAiPriority("MEDIUM");
            ticket.setAiSentiment("Neutral");
        } else {
            ticket.setAiPriority("LOW");
            ticket.setAiSentiment("Calm");
        }
    }
}