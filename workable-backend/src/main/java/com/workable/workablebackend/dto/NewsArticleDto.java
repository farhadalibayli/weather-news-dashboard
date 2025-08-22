package com.workable.workablebackend.dto;

import com.workable.workablebackend.model.NewsArticle;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsArticleDto {
    private Long id;
    private String title;
    private String description;
    private String content;
    private String author;
    private String source;
    private String sourceUrl;
    private String imageUrl;
    private NewsArticle.Category category;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    
    public static NewsArticleDto fromEntity(NewsArticle article) {
        return new NewsArticleDto(
            article.getId(),
            article.getTitle(),
            article.getDescription(),
            article.getContent(),
            article.getAuthor(),
            article.getSource(),
            article.getSourceUrl(),
            article.getImageUrl(),
            article.getCategory(),
            article.getPublishedAt(),
            article.getCreatedAt()
        );
    }
}
