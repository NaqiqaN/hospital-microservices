package com.hospital.auth.service;

import com.hospital.auth.dto.LoginRequest;
import com.hospital.auth.dto.RegisterRequest;
import com.hospital.auth.entity.User;
import com.hospital.auth.repository.UserRepository;
import com.hospital.auth.security.JwtUtil;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public String register(RegisterRequest request) {

        if (userRepository.findByUsername(
                request.getUsername()).isPresent()) {

            return "User already exists";
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        userRepository.save(user);

        return "User registered successfully";
    }

    public String login(LoginRequest request) {

        User user = userRepository.findByUsername(
                request.getUsername()
        ).orElse(null);

        if (user == null) {
            return "User not found";
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return "Invalid password";
        }

        return jwtUtil.generateToken(
                user.getUsername(),
                user.getRole()
        );
    }
}
