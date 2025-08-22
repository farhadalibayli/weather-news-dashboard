package com.workable.workablebackend.controller;

import com.workable.workablebackend.dto.AuthRequest;
import com.workable.workablebackend.dto.AuthResponse;
import com.workable.workablebackend.dto.UserDto;
import com.workable.workablebackend.dto.UpdateEmailRequest;
import com.workable.workablebackend.model.User;
import com.workable.workablebackend.security.JwtTokenProvider;
import com.workable.workablebackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(),
                authRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        User user = userService.findByEmail(authRequest.getEmail()).orElse(null);
        UserDto userDto = user != null ? userService.toDto(user) : null;

        return ResponseEntity.ok(new AuthResponse(jwt, userDto, "Login successful"));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody AuthRequest authRequest) {
        // Check if user already exists
        if (userService.findByEmail(authRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                .body(new AuthResponse(null, null, "User with this email already exists"));
        }

        // Create new user
        User user = new User();
        user.setEmail(authRequest.getEmail());
        user.setPassword(authRequest.getPassword());
        user.setName(authRequest.getEmail().split("@")[0]); // Use email prefix as name
        
        User savedUser = userService.createUser(user);
        UserDto userDto = userService.toDto(savedUser);

        // Generate token for new user
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authRequest.getEmail(),
                authRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new AuthResponse(jwt, userDto, "Registration successful"));
    }

    @PutMapping("/update-email")
    public ResponseEntity<?> updateEmail(@Valid @RequestBody UpdateEmailRequest request) {
        try {
            String newEmail = request.getNewEmail();
            if (newEmail == null || newEmail.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "New email is required"));
            }

            // Get current user from authentication
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String currentEmail = authentication.getName();
            
            User currentUser = userService.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

            // Update email (this creates a new user account and deletes the old one)
            User newUser = userService.updateUserEmail(currentUser.getId(), newEmail);
            UserDto userDto = userService.toDto(newUser);

            // Generate new token with the new user and email
            Authentication newAuthentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    newEmail,
                    "password123" // Default password for demo
                )
            );

            SecurityContextHolder.getContext().setAuthentication(newAuthentication);
            String newJwt = tokenProvider.generateToken(newAuthentication);

            return ResponseEntity.ok(new AuthResponse(newJwt, userDto, "Email updated successfully. Previous email account has been removed."));
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmailAvailability(@RequestParam String email) {
        boolean isAvailable = userService.isEmailUnique(email);
        return ResponseEntity.ok(Map.of("available", isAvailable));
    }
}
