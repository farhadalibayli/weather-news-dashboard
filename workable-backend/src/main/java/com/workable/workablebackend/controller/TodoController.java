package com.workable.workablebackend.controller;

import com.workable.workablebackend.dto.CreateTodoRequest;
import com.workable.workablebackend.dto.TodoDto;
import com.workable.workablebackend.service.TodoService;
import com.workable.workablebackend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "*")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<TodoDto>> getUserTodos(@RequestParam(required = false) Boolean completed) {
        Long userId = getCurrentUserId();
        List<TodoDto> todos;
        
        if (completed != null) {
            todos = todoService.getUserTodosByStatus(userId, completed);
        } else {
            todos = todoService.getUserTodos(userId);
        }
        
        return ResponseEntity.ok(todos);
    }

    @PostMapping
    public ResponseEntity<TodoDto> createTodo(@Valid @RequestBody CreateTodoRequest request) {
        Long userId = getCurrentUserId();
        TodoDto createdTodo = todoService.createTodo(userId, request);
        return ResponseEntity.ok(createdTodo);
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable Long todoId, 
                                            @Valid @RequestBody CreateTodoRequest request) {
        Long userId = getCurrentUserId();
        TodoDto updatedTodo = todoService.updateTodo(userId, todoId, request);
        return ResponseEntity.ok(updatedTodo);
    }

    @PatchMapping("/{todoId}/toggle")
    public ResponseEntity<TodoDto> toggleTodoStatus(@PathVariable Long todoId) {
        Long userId = getCurrentUserId();
        TodoDto updatedTodo = todoService.toggleTodoStatus(userId, todoId);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long todoId) {
        Long userId = getCurrentUserId();
        todoService.deleteTodo(userId, todoId);
        return ResponseEntity.noContent().build();
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }
}
