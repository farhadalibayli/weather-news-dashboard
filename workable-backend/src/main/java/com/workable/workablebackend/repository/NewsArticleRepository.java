package com.workable.workablebackend.repository;

import com.workable.workablebackend.model.NewsArticle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Long> {
    Page<NewsArticle> findByCategoryOrderByPublishedAtDesc(NewsArticle.Category category, Pageable pageable);
    
    Page<NewsArticle> findAllByOrderByPublishedAtDesc(Pageable pageable);
    
    Optional<NewsArticle> findByTitle(String title);
    
    long countByCategory(NewsArticle.Category category);
}
