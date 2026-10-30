package com.example.helpdesk.service;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.helpdesk.model.Ticket;

@Service
public class NotificationService {
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public SseEmitter subscribe() {
        SseEmitter emitter = new SseEmitter(30 * 60 * 1000L); // 30 mins timeout
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));

        return emitter;
    }

    public void broadcastNewTicket(Ticket ticket) {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event()
                        .name("NEW_AI_TICKET")
                        .data(ticket));
            } catch (IOException e) {
                emitters.remove(emitter);
            }
        }
    }
}