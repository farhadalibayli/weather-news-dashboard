package com.workable.workablebackend.service;

import com.workable.workablebackend.model.Todo;
import com.workable.workablebackend.model.User;
import com.workable.workablebackend.repository.TodoRepository;
import com.workable.workablebackend.dto.TodoDto;
import com.workable.workablebackend.dto.CreateTodoRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    private final UserService userService;

    @Autowired
    public TodoService(TodoRepository todoRepository, UserService userService) {
        this.todoRepository = todoRepository;
        this.userService = userService;
    }

    public List<TodoDto> getUserTodos(Long userId) {
        Optional<User> user = userService.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        return todoRepository.findByUserOrderByCreatedAtDesc(user.get())
                .stream()
                .map(TodoDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<TodoDto> getUserTodosByStatus(Long userId, Boolean completed) {
        Optional<User> user = userService.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        return todoRepository.findByUserAndCompletedOrderByCreatedAtDesc(user.get(), completed)
                .stream()
                .map(TodoDto::fromEntity)
                .collect(Collectors.toList());
    }

    public TodoDto createTodo(Long userId, CreateTodoRequest request) {
        Optional<User> user = userService.findById(userId);
        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Todo todo = new Todo();
        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setPriority(request.getPriority());
        todo.setUser(user.get());

        Todo savedTodo = todoRepository.save(todo);
        return TodoDto.fromEntity(savedTodo);
    }

    public TodoDto updateTodo(Long userId, Long todoId, CreateTodoRequest request) {
        Optional<Todo> todoOpt = todoRepository.findById(todoId);
        if (todoOpt.isEmpty()) {
            throw new RuntimeException("Todo not found");
        }

        Todo todo = todoOpt.get();
        if (!todo.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to todo");
        }

        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setPriority(request.getPriority());

        Todo updatedTodo = todoRepository.save(todo);
        return TodoDto.fromEntity(updatedTodo);
    }

    public TodoDto toggleTodoStatus(Long userId, Long todoId) {
        Optional<Todo> todoOpt = todoRepository.findById(todoId);
        if (todoOpt.isEmpty()) {
            throw new RuntimeException("Todo not found");
        }

        Todo todo = todoOpt.get();
        if (!todo.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to todo");
        }

        todo.setCompleted(!todo.isCompleted());
        Todo updatedTodo = todoRepository.save(todo);
        return TodoDto.fromEntity(updatedTodo);
    }

    public void deleteTodo(Long userId, Long todoId) {
        Optional<Todo> todoOpt = todoRepository.findById(todoId);
        if (todoOpt.isEmpty()) {
            throw new RuntimeException("Todo not found");
        }

        Todo todo = todoOpt.get();
        if (!todo.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to todo");
        }

        todoRepository.delete(todo);
    }
}
