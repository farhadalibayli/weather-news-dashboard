package com.workable.workablebackend.controller;

import com.workable.workablebackend.dto.NewsArticleDto;
import com.workable.workablebackend.model.NewsArticle;
import com.workable.workablebackend.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping
    public ResponseEntity<Page<NewsArticleDto>> getNewsArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<NewsArticleDto> articles = newsService.getNewsArticles(page, size);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/{category}")
    public ResponseEntity<Page<NewsArticleDto>> getNewsArticlesByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            NewsArticle.Category categoryEnum = NewsArticle.Category.valueOf(category.toUpperCase());
            Page<NewsArticleDto> articles = newsService.getNewsArticlesByCategory(categoryEnum, page, size);
            return ResponseEntity.ok(articles);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
