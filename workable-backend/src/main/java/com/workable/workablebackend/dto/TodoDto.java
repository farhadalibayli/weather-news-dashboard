package com.workable.workablebackend.dto;

import com.workable.workablebackend.model.Todo;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TodoDto {
    private Long id;
    private String title;
    private String description;
    private Todo.Priority priority;
    private boolean completed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static TodoDto fromEntity(Todo todo) {
        return new TodoDto(
            todo.getId(),
            todo.getTitle(),
            todo.getDescription(),
            todo.getPriority(),
            todo.isCompleted(),
            todo.getCreatedAt(),
            todo.getUpdatedAt()
        );
    }
}
