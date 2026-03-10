package com.gamestoreprototype.backend.service;

import com.gamestoreprototype.backend.dto.AuthRequest;
import com.gamestoreprototype.backend.dto.AuthResponse;
import com.gamestoreprototype.backend.model.User;
import com.gamestoreprototype.backend.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public AuthResponse login(AuthRequest request) {
        Optional<User> userOpt = userRepo.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return new AuthResponse(false, "Invalid email or password", null, null);
        }

        User user = userOpt.get();

        // Check if password matches (supports both hashed and plain text for existing users)
        boolean matches = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!matches) {
            return new AuthResponse(false, "Invalid email or password", null, null);
        }

        return new AuthResponse(true, "Login successful", user.getRole(), user.getId());
    }

    public AuthResponse register(AuthRequest request) {
        // Check if email already exists
        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            return new AuthResponse(false, "Email already registered", null, null);
        }

        // Hash the password
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        // Create new user with role USER always
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(hashedPassword);
        user.setRole("USER");

        userRepo.save(user);

        return new AuthResponse(true, "Registration successful", "USER", user.getId());
    }
}