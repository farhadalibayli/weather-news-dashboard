# 🚀 Workable Backend - Spring Boot API

<div align="center">

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-green?style=for-the-badge&logo=spring)
![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Authentication-yellow?style=for-the-badge&logo=jsonwebtokens)

**A robust Spring Boot REST API with JWT authentication, real-time weather, news, and todo management**

[📖 API Docs](#api-documentation) • [🔧 Configuration](#configuration) • [🚀 Quick Start](#quick-start)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗 Architecture](#-architecture)
- [🚀 Quick Start](#-quick-start)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#configuration)
- [📚 API Documentation](#api-documentation)
- [🔒 Security](#-security)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🐛 Troubleshooting](#-troubleshooting)

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- **JWT Token Security** - Stateless authentication with configurable expiration
- **Email-Based Login** - Simple authentication using email addresses
- **Password Encryption** - BCrypt hashing for secure password storage
- **Account Management** - Email change with complete data transfer
- **Session Persistence** - Automatic token validation and renewal
- **Protected Routes** - Role-based access control for sensitive operations

### ✅ **Todo Management System**
- **User-Specific Todos** - Each user sees only their own tasks
- **Full CRUD Operations** - Create, Read, Update, Delete todos
- **Priority Levels** - LOW, MEDIUM, HIGH with intelligent filtering
- **Status Tracking** - Complete/incomplete status with toggle functionality
- **Real-time Updates** - Instant status changes and modifications
- **Data Persistence** - MySQL database with JPA/Hibernate

### 🌦 **Weather Integration**
- **OpenWeatherMap API** - Real weather data from 200,000+ cities worldwide
- **Geolocation Support** - Weather by coordinates (latitude/longitude)
- **City-Based Search** - Manual city name lookup
- **Intelligent Caching** - Reduces API calls and improves performance
- **Error Handling** - Graceful fallbacks for API failures
- **Weather Details** - Temperature, humidity, wind speed, conditions, icons

### 📰 **News Feed System**
- **NewsAPI Integration** - Real-time news from global sources
- **Category Filtering** - Technology, Business, Sports, Entertainment, Health, Science, Politics
- **Pagination Support** - Efficient loading with configurable page sizes
- **Caching Strategy** - Smart caching to minimize API costs
- **Source Attribution** - Proper news source linking and metadata
- **Error Recovery** - Fallback mechanisms for API outages

### 🎯 **Advanced Features**
- **Global Exception Handling** - Centralized error management
- **Request Validation** - Input validation with custom error messages
- **CORS Configuration** - Secure cross-origin resource sharing
- **Database Migrations** - Automatic schema updates with Hibernate
- **Logging System** - Comprehensive logging for debugging
- **Health Checks** - Application health monitoring endpoints

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Workable Backend                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Controllers │  │   Services  │  │ Repositories│        │
│  │             │  │             │  │             │        │
│  │ • Auth      │  │ • Business  │  │ • Data      │        │
│  │ • Todo      │  │   Logic     │  │   Access    │        │
│  │ • Weather   │  │ • API Calls │  │ • Queries   │        │
│  │ • News      │  │ • Caching   │  │ • Relations │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Security  │  │     DTOs    │  │   Models    │        │
│  │             │  │             │  │             │        │
│  │ • JWT       │  │ • Request   │  │ • Entities  │        │
│  │ • CORS      │  │ • Response  │  │ • Relations │        │
│  │ • Auth      │  │ • Validation│  │ • Annotations│       │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   MySQL     │  │ OpenWeather │  │   NewsAPI   │        │
│  │  Database   │  │     API     │  │             │        │
│  │             │  │             │  │             │        │
│  │ • Users     │  │ • Weather   │  │ • News      │        │
│  │ • Todos     │  │   Data      │  │   Articles  │        │
│  │ • Cache     │  │ • Forecast  │  │ • Categories│        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### **Request Flow**
1. **Client Request** → REST Controller
2. **Authentication** → JWT Token Validation
3. **Authorization** → Role/Permission Check
4. **Business Logic** → Service Layer Processing
5. **Data Access** → Repository Layer
6. **External APIs** → Weather/News Services
7. **Response** → JSON Data to Client

---

## 🚀 Quick Start

### **Prerequisites**
- **Java 17** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher
- **Git** for version control

### **1. Clone and Setup**
```bash
# Clone the repository
git clone https://github.com/yourusername/workable.git
cd workable/workable-backend

# Install dependencies
mvn clean install
```

### **2. Database Configuration**
```sql
-- Create database
CREATE DATABASE workable_db;

-- Create user (optional)
CREATE USER 'workable_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON workable_db.* TO 'workable_user'@'localhost';
FLUSH PRIVILEGES;
```

### **3. Environment Setup**
Create `src/main/resources/application.properties`:
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/workable_db
spring.datasource.username=workable_user
spring.datasource.password=your_secure_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

# JWT Configuration
app.jwt-secret=your_super_secret_jwt_key_here_make_it_long_and_random
app.jwt-expiration-milliseconds=86400000

# External APIs (Get free keys below)
app.weather.api-key=YOUR_OPENWEATHERMAP_API_KEY
app.weather.base-url=https://api.openweathermap.org/data/2.5
app.news.api-key=YOUR_NEWSAPI_KEY
app.news.base-url=https://newsapi.org/v2

# Server Configuration
server.port=8080
server.servlet.context-path=/api
```

### **4. Get API Keys**
- 🌦 **[OpenWeatherMap API](https://openweathermap.org/api)** - Free tier: 1000 calls/day
- 📰 **[NewsAPI](https://newsapi.org/)** - Free tier: 1000 calls/day

### **5. Run the Application**
```bash
# Development mode
mvn spring-boot:run

# Or build and run JAR
mvn clean package
java -jar target/workable-backend-0.0.1-SNAPSHOT.jar
```

### **6. Verify Installation**
```bash
# Health check
curl http://localhost:8080/api/health

# Test authentication
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Application will be available at:** `http://localhost:8080`

---

## 🛠 Tech Stack

| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| **Spring Boot** | 3.5.5 | Main Framework | [Spring Boot Docs](https://spring.io/projects/spring-boot) |
| **Spring Security** | 6.1.0 | Authentication & Authorization | [Spring Security Docs](https://spring.io/projects/spring-security) |
| **Spring Data JPA** | 3.1.0 | Database Access | [Spring Data Docs](https://spring.io/projects/spring-data) |
| **MySQL** | 8.0.0 | Database | [MySQL Docs](https://dev.mysql.com/doc/) |
| **JWT** | 0.11.5 | Token Authentication | [JWT Docs](https://jwt.io/) |
| **Lombok** | 1.18.26 | Code Generation | [Lombok Docs](https://projectlombok.org/) |
| **Maven** | 3.6+ | Build Tool | [Maven Docs](https://maven.apache.org/) |
| **RestTemplate** | 6.1.0 | HTTP Client | [Spring Docs](https://docs.spring.io/spring-framework/reference/web/webmvc-rest.html) |

### **Dependencies Overview**
```xml
<!-- Core Spring Boot -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Security & JWT -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- Database -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- MySQL Driver -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>

<!-- Validation -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

---

## 📁 Project Structure

```
src/main/java/com/workable/workablebackend/
├── 📁 config/                    # Configuration classes
│   ├── RestTemplateConfig.java   # HTTP client configuration
│   └── SecurityConfig.java       # Security and CORS settings
│
├── 📁 controller/                # REST API controllers
│   ├── AuthController.java       # Authentication endpoints
│   ├── TodoController.java       # Todo CRUD operations
│   ├── WeatherController.java    # Weather data endpoints
│   └── NewsController.java       # News article endpoints
│
├── 📁 dto/                      # Data Transfer Objects
│   ├── AuthRequest.java         # Login/Register requests
│   ├── AuthResponse.java        # Authentication responses
│   ├── TodoDto.java             # Todo data transfer
│   ├── WeatherDto.java          # Weather data transfer
│   ├── NewsArticleDto.java      # News data transfer
│   ├── OpenWeatherResponse.java # OpenWeatherMap API response
│   ├── NewsApiResponse.java     # NewsAPI response
│   └── UpdateEmailRequest.java  # Email update requests
│
├── 📁 exception/                # Exception handling
│   └── GlobalExceptionHandler.java # Global error handler
│
├── 📁 model/                    # Entity models
│   ├── User.java               # User entity
│   ├── Todo.java               # Todo entity
│   ├── WeatherData.java        # Weather cache entity
│   └── NewsArticle.java        # News cache entity
│
├── 📁 repository/               # Data access layer
│   ├── UserRepository.java     # User data operations
│   ├── TodoRepository.java     # Todo data operations
│   ├── WeatherDataRepository.java # Weather cache operations
│   └── NewsArticleRepository.java # News cache operations
│
├── 📁 security/                 # Security components
│   ├── JwtAuthenticationFilter.java # JWT filter
│   ├── JwtTokenProvider.java   # JWT token operations
│   └── CustomUserDetailsService.java # User details service
│
├── 📁 service/                  # Business logic
│   ├── UserService.java        # User management
│   ├── TodoService.java        # Todo business logic
│   ├── WeatherService.java     # Weather API integration
│   └── NewsService.java        # News API integration
│
└── WorkableBackendApplication.java # Main application class
```

---

## 🔧 Configuration

### **Application Properties**

#### **Database Configuration**
```properties
# MySQL Database
spring.datasource.url=jdbc:mysql://localhost:3306/workable_db
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:password}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true
```

#### **JWT Configuration**
```properties
# JWT Settings
app.jwt-secret=${JWT_SECRET:your_super_secret_jwt_key_here_make_it_long_and_random}
app.jwt-expiration-milliseconds=${JWT_EXPIRATION:86400000}
```

#### **External API Configuration**
```properties
# OpenWeatherMap API
app.weather.api-key=${WEATHER_API_KEY:your_openweathermap_api_key}
app.weather.base-url=https://api.openweathermap.org/data/2.5

# NewsAPI
app.news.api-key=${NEWS_API_KEY:your_newsapi_key}
app.news.base-url=https://newsapi.org/v2
```

#### **Server Configuration**
```properties
# Server Settings
server.port=${PORT:8080}
server.servlet.context-path=/api

# Logging
logging.level.com.workable=DEBUG
logging.level.org.springframework.security=DEBUG
```

### **Environment Variables**

Create a `.env` file for production:
```env
# Database
DB_USERNAME=workable_user
DB_PASSWORD=your_secure_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRATION=86400000

# External APIs
WEATHER_API_KEY=your_openweathermap_api_key
NEWS_API_KEY=your_newsapi_key

# Server
PORT=8080
```

---

## 📚 API Documentation

### **Base URL**
```
http://localhost:8080/api
```

### **Authentication Endpoints**

#### **Login/Register User**
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "user",
    "email": "user@example.com"
  },
  "message": "Login successful"
}
```

#### **Update Email**
```http
PUT /auth/update-email
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "newEmail": "newuser@example.com"
}

Response:
{
  "token": "new_jwt_token",
  "user": {
    "id": 2,
    "name": "user",
    "email": "newuser@example.com"
  },
  "message": "Email updated successfully. Previous email account has been removed."
}
```

#### **Check Email Availability**
```http
GET /auth/check-email?email=user@example.com

Response:
{
  "available": true
}
```

### **Todo Endpoints**

#### **Get User Todos**
```http
GET /todos
GET /todos?completed=true
GET /todos?completed=false
Authorization: Bearer <jwt_token>

Response:
[
  {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the implementation",
    "completed": false,
    "priority": "HIGH",
    "createdAt": "2024-01-15T10:30:00"
  }
]
```

#### **Create Todo**
```http
POST /todos
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the implementation",
  "priority": "HIGH"
}

Response:
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the implementation",
  "completed": false,
  "priority": "HIGH",
  "createdAt": "2024-01-15T10:30:00"
}
```

#### **Update Todo**
```http
PUT /todos/{id}
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "MEDIUM"
}
```

#### **Toggle Todo Status**
```http
PATCH /todos/{id}/toggle
Authorization: Bearer <jwt_token>

Response:
{
  "id": 1,
  "title": "Complete project",
  "completed": true,
  "priority": "HIGH"
}
```

#### **Delete Todo**
```http
DELETE /todos/{id}
Authorization: Bearer <jwt_token>
```

### **Weather Endpoints**

#### **Get Weather by City**
```http
GET /weather?city=London

Response:
{
  "city": "London",
  "country": "GB",
  "temperature": 15.5,
  "feelsLike": 14.2,
  "humidity": 75,
  "windSpeed": 5.2,
  "description": "scattered clouds",
  "icon": "03d"
}
```

#### **Get Weather by Coordinates**
```http
GET /weather?lat=51.5074&lng=-0.1278

Response:
{
  "city": "London",
  "country": "GB",
  "temperature": 15.5,
  "feelsLike": 14.2,
  "humidity": 75,
  "windSpeed": 5.2,
  "description": "scattered clouds",
  "icon": "03d"
}
```

### **News Endpoints**

#### **Get All News**
```http
GET /news?page=0&size=10

Response:
{
  "content": [
    {
      "id": 1,
      "title": "Breaking News",
      "description": "News description",
      "url": "https://example.com/news",
      "urlToImage": "https://example.com/image.jpg",
      "publishedAt": "2024-01-15T10:30:00",
      "source": "News Source",
      "category": "TECHNOLOGY"
    }
  ],
  "totalElements": 100,
  "totalPages": 10,
  "currentPage": 0
}
```

#### **Get News by Category**
```http
GET /news/technology?page=0&size=10

Available Categories:
- technology
- business
- sports
- entertainment
- health
- science
- politics
```

---

## 🔒 Security

### **Authentication Flow**
1. **User Login** → Email/Password validation
2. **JWT Generation** → Secure token creation
3. **Token Storage** → Client-side storage
4. **Request Authorization** → Token validation on each request
5. **Token Refresh** → Automatic renewal when needed

### **Security Features**
- **JWT Token Security** - Stateless authentication
- **Password Encryption** - BCrypt hashing
- **CORS Configuration** - Secure cross-origin requests
- **Input Validation** - Server-side validation
- **SQL Injection Prevention** - Parameterized queries
- **XSS Protection** - Content Security Policy

### **Protected Routes**
```java
// All todo endpoints require authentication
@PreAuthorize("isAuthenticated()")
@GetMapping("/todos")
public ResponseEntity<List<TodoDto>> getUserTodos() {
    // Implementation
}

// Email update requires authentication
@PreAuthorize("isAuthenticated()")
@PutMapping("/auth/update-email")
public ResponseEntity<?> updateEmail(@Valid @RequestBody UpdateEmailRequest request) {
    // Implementation
}
```

---

## 🧪 Testing

### **Unit Testing**
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run with coverage
mvn jacoco:report
```

### **Integration Testing**
```bash
# Test API endpoints
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test protected endpoint
curl -X GET http://localhost:8080/api/todos \
  -H "Authorization: Bearer <your_jwt_token>"
```

### **Test Coverage**
```bash
# Generate coverage report
mvn clean test jacoco:report

# View coverage report
open target/site/jacoco/index.html
```

---

## 🚀 Deployment

### **Docker Deployment**

#### **Dockerfile**
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/workable-backend-*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### **Docker Compose**
```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DB_USERNAME=workable_user
      - DB_PASSWORD=your_password
      - JWT_SECRET=your_jwt_secret
      - WEATHER_API_KEY=your_weather_key
      - NEWS_API_KEY=your_news_key
    depends_on:
      - mysql
  
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: workable_db
      MYSQL_USER: workable_user
      MYSQL_PASSWORD: your_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

### **Cloud Deployment**

#### **Heroku**
```bash
# Create Heroku app
heroku create workable-backend

# Set environment variables
heroku config:set DB_USERNAME=your_username
heroku config:set DB_PASSWORD=your_password
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set WEATHER_API_KEY=your_weather_key
heroku config:set NEWS_API_KEY=your_news_key

# Deploy
git push heroku main
```

#### **AWS Elastic Beanstalk**
```bash
# Initialize EB
eb init workable-backend

# Create environment
eb create workable-backend-prod

# Set environment variables
eb setenv DB_USERNAME=your_username
eb setenv DB_PASSWORD=your_password
eb setenv JWT_SECRET=your_jwt_secret

# Deploy
eb deploy
```

### **Production Configuration**
```properties
# Production settings
spring.profiles.active=prod
server.port=${PORT:8080}

# Database (use production database)
spring.datasource.url=${DATABASE_URL}

# Security
app.jwt-secret=${JWT_SECRET}
app.jwt-expiration-milliseconds=86400000

# External APIs
app.weather.api-key=${WEATHER_API_KEY}
app.news.api-key=${NEWS_API_KEY}

# Logging
logging.level.root=WARN
logging.level.com.workable=INFO
```

---

## 🐛 Troubleshooting

### **Common Issues**

#### **Database Connection Error**
```bash
# Check MySQL service
sudo systemctl status mysql

# Test connection
mysql -u workable_user -p workable_db

# Verify credentials in application.properties
```

#### **JWT Token Issues**
```bash
# Check JWT secret configuration
echo $JWT_SECRET

# Verify token format
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### **External API Errors**
```bash
# Test OpenWeatherMap API
curl "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY"

# Test NewsAPI
curl "https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY"
```

#### **CORS Issues**
```java
// Verify CORS configuration in SecurityConfig.java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOriginPatterns(Arrays.asList("*"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### **Logs and Debugging**
```bash
# Enable debug logging
logging.level.com.workable=DEBUG
logging.level.org.springframework.security=DEBUG

# View application logs
tail -f logs/application.log

# Check startup logs
mvn spring-boot:run -X
```

### **Performance Optimization**
```properties
# Database connection pool
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5

# JPA optimization
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true

# Caching
spring.cache.type=caffeine
spring.cache.caffeine.spec=maximumSize=500,expireAfterWrite=600s
```

---

<div align="center">

**Built with ❤️ using Spring Boot**

[📖 Full Documentation](#) • [🐛 Report Issues](#) • [💡 Request Features](#)

</div>
