package com.example.helpdesk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.helpdesk.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}