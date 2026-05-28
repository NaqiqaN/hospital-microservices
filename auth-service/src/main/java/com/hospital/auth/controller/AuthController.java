package com.hospital.auth.controller;

import com.hospital.auth.dto.LoginRequest;
import com.hospital.auth.dto.RegisterRequest;
import com.hospital.auth.security.JwtUtil;
import com.hospital.auth.service.AuthService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService,
                          JwtUtil jwtUtil) {

        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }

    @GetMapping("/validate")
    public String validateToken(
            @RequestHeader("Authorization")
            String authHeader) {

        String token = authHeader.substring(7);

        String username =
                jwtUtil.extractUsername(token);

        String role =
                jwtUtil.extractRole(token);

        return "Token valid. Username: "
                + username +
                ", Role: " + role;
    }

    @GetMapping("/admin")
    public String adminOnly(
            @RequestHeader("Authorization")
            String authHeader) {

        String token = authHeader.substring(7);

        String role = jwtUtil.extractRole(token);

        if (!role.equals("ADMIN")) {
            return "Access denied. ADMIN only.";
        }

        return "Welcome ADMIN";
    }
}