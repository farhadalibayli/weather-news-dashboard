package com.workable.workablebackend.service;

import com.workable.workablebackend.model.NewsArticle;
import com.workable.workablebackend.repository.NewsArticleRepository;
import com.workable.workablebackend.dto.NewsArticleDto;
import com.workable.workablebackend.dto.NewsApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class NewsService {

    private final NewsArticleRepository newsArticleRepository;
    private final RestTemplate restTemplate;

    @Value("${app.news.api-key:}")
    private String apiKey;

    @Value("${app.news.base-url:}")
    private String baseUrl;

    @Autowired
    public NewsService(NewsArticleRepository newsArticleRepository, RestTemplate restTemplate) {
        this.newsArticleRepository = newsArticleRepository;
        this.restTemplate = restTemplate;
    }

    public Page<NewsArticleDto> getNewsArticles(int page, int size) {
        // Check if we have enough articles in database
        if (newsArticleRepository.count() < 10) {
            fetchAndSaveLatestNews();
        }
        
        Pageable pageable = PageRequest.of(page, size);
        return newsArticleRepository.findAllByOrderByPublishedAtDesc(pageable)
                .map(NewsArticleDto::fromEntity);
    }

    public Page<NewsArticleDto> getNewsArticlesByCategory(NewsArticle.Category category, int page, int size) {
        // Fetch category-specific news if we don't have enough
        if (newsArticleRepository.countByCategory(category) < 5) {
            fetchAndSaveNewsByCategory(category);
        }
        
        Pageable pageable = PageRequest.of(page, size);
        return newsArticleRepository.findByCategoryOrderByPublishedAtDesc(category, pageable)
                .map(NewsArticleDto::fromEntity);
    }

    private void fetchAndSaveLatestNews() {
        // Check if API is properly configured
        if (apiKey == null || apiKey.isEmpty() || baseUrl == null || baseUrl.isEmpty()) {
            throw new RuntimeException("News API not configured. Please check your NewsAPI configuration in application.properties");
        }

        String url = UriComponentsBuilder
            .fromHttpUrl(baseUrl + "/top-headlines")
            .queryParam("country", "us")
            .queryParam("apiKey", apiKey)
            .queryParam("pageSize", 20)
            .build()
            .toUriString();

        NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
        
        if (response != null && response.getArticles() != null) {
            for (NewsApiResponse.Article apiArticle : response.getArticles()) {
                saveApiArticle(apiArticle, null);
            }
        }
    }

    private void fetchAndSaveNewsByCategory(NewsArticle.Category category) {
        // Check if API is properly configured
        if (apiKey == null || apiKey.isEmpty() || baseUrl == null || baseUrl.isEmpty()) {
            throw new RuntimeException("News API not configured. Please check your NewsAPI configuration in application.properties");
        }

        String categoryParam = mapCategoryToNewsApi(category);
        
        String url = UriComponentsBuilder
            .fromHttpUrl(baseUrl + "/top-headlines")
            .queryParam("country", "us")
            .queryParam("category", categoryParam)
            .queryParam("apiKey", apiKey)
            .queryParam("pageSize", 10)
            .build()
            .toUriString();

        NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
        
        if (response != null && response.getArticles() != null) {
            for (NewsApiResponse.Article apiArticle : response.getArticles()) {
                saveApiArticle(apiArticle, category);
            }
        }
    }

    private String mapCategoryToNewsApi(NewsArticle.Category category) {
        switch (category) {
            case TECHNOLOGY: return "technology";
            case BUSINESS: return "business";
            case SPORTS: return "sports";
            default: return "general";
        }
    }

    private void saveApiArticle(NewsApiResponse.Article apiArticle, NewsArticle.Category category) {
        // Check if article already exists
        if (newsArticleRepository.findByTitle(apiArticle.getTitle()).isPresent()) {
            return;
        }

        NewsArticle article = new NewsArticle();
        article.setTitle(apiArticle.getTitle());
        article.setDescription(apiArticle.getDescription());
        article.setContent(apiArticle.getContent() != null ? apiArticle.getContent() : apiArticle.getDescription());
        article.setAuthor(apiArticle.getAuthor() != null ? apiArticle.getAuthor() : "Unknown");
        article.setSource(apiArticle.getSource() != null ? apiArticle.getSource().getName() : "Unknown");
        article.setSourceUrl(apiArticle.getUrl());
        article.setImageUrl(apiArticle.getUrlToImage());
        
        // Map category if not provided
        if (category == null) {
            category = mapSourceToCategory(article.getSource());
        }
        article.setCategory(category);
        
        // Parse published date
        if (apiArticle.getPublishedAt() != null) {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
                article.setPublishedAt(LocalDateTime.parse(apiArticle.getPublishedAt(), formatter));
            } catch (Exception e) {
                article.setPublishedAt(LocalDateTime.now());
            }
        } else {
            article.setPublishedAt(LocalDateTime.now());
        }
        
        newsArticleRepository.save(article);
    }

    private NewsArticle.Category mapSourceToCategory(String source) {
        String sourceLower = source.toLowerCase();
        if (sourceLower.contains("tech") || sourceLower.contains("ai") || sourceLower.contains("digital")) {
            return NewsArticle.Category.TECHNOLOGY;
        } else if (sourceLower.contains("business") || sourceLower.contains("finance") || sourceLower.contains("market")) {
            return NewsArticle.Category.BUSINESS;
        } else if (sourceLower.contains("sport") || sourceLower.contains("athletic")) {
            return NewsArticle.Category.SPORTS;
        } else {
            return NewsArticle.Category.GENERAL;
        }
    }
}
