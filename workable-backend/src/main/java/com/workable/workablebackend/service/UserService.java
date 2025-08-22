package com.workable.workablebackend.service;

import com.workable.workablebackend.model.User;
import com.workable.workablebackend.repository.UserRepository;
import com.workable.workablebackend.repository.TodoRepository;
import com.workable.workablebackend.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final TodoRepository todoRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, TodoRepository todoRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.todoRepository = todoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
    public UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail());
    }

    @Transactional
    public User updateUserEmail(Long userId, String newEmail) {
        // Check if user exists
        User oldUser = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Check if new email is different from current email
        if (oldUser.getEmail().equals(newEmail)) {
            throw new RuntimeException("New email is the same as current email");
        }
        
        // Check if new email already exists
        Optional<User> existingUserWithNewEmail = userRepository.findByEmail(newEmail);
        if (existingUserWithNewEmail.isPresent()) {
            throw new RuntimeException("User with this email already exists");
        }
        
        // Create new user with the new email
        User newUser = new User();
        newUser.setEmail(newEmail);
        newUser.setPassword(oldUser.getPassword()); // Keep the same password
        newUser.setName(oldUser.getName()); // Keep the same name
        
        // Save the new user first
        User savedNewUser = userRepository.save(newUser);
        
        // Transfer all todos from old user to new user
        var todos = todoRepository.findByUserOrderByCreatedAtDesc(oldUser);
        for (var todo : todos) {
            todo.setUser(savedNewUser);
        }
        todoRepository.saveAll(todos);
        
        // Delete the old user account
        userRepository.delete(oldUser);
        
        return savedNewUser;
    }

    public boolean isEmailUnique(String email) {
        return !userRepository.findByEmail(email).isPresent();
    }
}