package com.example.helpdesk.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.helpdesk.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}