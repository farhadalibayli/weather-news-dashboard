package com.workable.workablebackend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

@Data
public class NewsApiResponse {
    private String status;
    private int totalResults;
    private List<Article> articles;

    @Data
    public static class Article {
        private Source source;
        private String author;
        private String title;
        private String description;
        private String url;
        @JsonProperty("urlToImage")
        private String urlToImage;
        @JsonProperty("publishedAt")
        private String publishedAt;
        private String content;
    }

    @Data
    public static class Source {
        private String id;
        private String name;
    }
}
