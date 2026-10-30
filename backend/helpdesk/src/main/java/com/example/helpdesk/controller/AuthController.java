package com.example.helpdesk.controller;

import com.example.helpdesk.model.User;
import com.example.helpdesk.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private final String SECRET_KEY = "5367566B59703373367639792F423F4528482B4D6251655468576D5a71347437";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // Generate JWT Token
        String token = Jwts.builder()
                .setSubject(user.getUsername())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)
                .compact();

        return ResponseEntity.ok(Map.of(
                "token", token,
                "role", user.getRole()
        ));
    }
}