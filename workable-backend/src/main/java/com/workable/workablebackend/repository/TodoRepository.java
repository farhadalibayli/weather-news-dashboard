package com.workable.workablebackend.repository;

import com.workable.workablebackend.model.Todo;
import com.workable.workablebackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserOrderByCreatedAtDesc(User user);
    
    List<Todo> findByUserAndCompletedOrderByCreatedAtDesc(User user, boolean completed);
    
    @Query("SELECT t FROM Todo t WHERE t.user = :user AND " +
           "(:completed IS NULL OR t.completed = :completed) AND " +
           "(:priority IS NULL OR t.priority = :priority)")
    List<Todo> findByUserAndFilters(@Param("user") User user, 
                                   @Param("completed") Boolean completed,
                                   @Param("priority") Todo.Priority priority);
}
