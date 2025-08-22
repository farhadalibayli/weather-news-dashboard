# Workable Backend

A Spring Boot backend application for the Workable Dashboard platform, providing RESTful APIs for user management, todo management, weather data, and news articles.

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- User registration and login
- Password encryption with BCrypt
- Protected routes for authenticated users

### ✅ Todo Management
- Full CRUD operations for todos
- User-specific todo lists
- Priority levels (LOW, MEDIUM, HIGH)
- Status tracking (completed/incomplete)
- Filtering by status

### 🌦 Weather Data
- Mock weather data generation
- City-based weather information
- Temperature, humidity, wind speed, and conditions
- Ready for real weather API integration

### 📰 News Articles
- Mock news articles with multiple categories
- Pagination support
- Category filtering
- Technology, Business, Sports, Entertainment, Health, Science, Politics

## 🛠 Tech Stack

- **Spring Boot 3.5.5** - Main framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **MySQL** - Database
- **JWT** - Token-based authentication
- **Lombok** - Code generation
- **Maven** - Build tool

## 📋 Prerequisites

- Java 17 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## 🚀 Getting Started

### 1. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE workable_db;
```

### 2. Configuration

Update the database configuration in `src/main/resources/application.properties`:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Build and Run

```bash
# Navigate to the backend directory
cd workable-backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Todo Endpoints

All todo endpoints require authentication (include `Authorization: Bearer <token>` header)

#### Get User Todos
```
GET /api/todos
GET /api/todos?completed=true
GET /api/todos?completed=false
```

#### Create Todo
```
POST /api/todos
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the backend implementation",
  "priority": "HIGH"
}
```

#### Update Todo
```
PUT /api/todos/{todoId}
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "priority": "MEDIUM"
}
```

#### Toggle Todo Status
```
PATCH /api/todos/{todoId}/toggle
```

#### Delete Todo
```
DELETE /api/todos/{todoId}
```

### Weather Endpoints

#### Get Weather by City
```
GET /api/weather/{city}
```

### News Endpoints

#### Get All News
```
GET /api/news?page=0&size=10
```

#### Get News by Category
```
GET /api/news/category/TECHNOLOGY?page=0&size=10
```

Available categories: `TECHNOLOGY`, `BUSINESS`, `SPORTS`, `ENTERTAINMENT`, `HEALTH`, `SCIENCE`, `POLITICS`

## 🔧 Configuration

### JWT Configuration
```properties
app.jwt-secret=your_jwt_secret_key
app.jwt-expiration-milliseconds=86400000
```

### Database Configuration
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/workable_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## 🏗 Project Structure

```
src/main/java/com/workable/workablebackend/
├── config/                 # Configuration classes
├── controller/            # REST controllers
├── dto/                  # Data Transfer Objects
├── exception/            # Exception handling
├── model/                # Entity models
├── repository/           # Data access layer
├── security/             # Security configuration
├── service/              # Business logic
└── WorkableBackendApplication.java
```

## 🔒 Security

- JWT-based authentication
- Password encryption with BCrypt
- CORS configuration for frontend integration
- Protected routes for sensitive operations
- Global exception handling

## 🧪 Testing

Run tests with:
```bash
mvn test
```

## 📝 Environment Variables

Create a `.env` file for sensitive configuration:
```env
DB_USERNAME=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

## 🤝 Integration with Frontend

The backend is configured to work with the React frontend:
- CORS enabled for cross-origin requests
- JWT tokens for authentication
- RESTful API design
- JSON response format

## 🚀 Deployment

### Local Development
```bash
mvn spring-boot:run
```

### Production Build
```bash
mvn clean package
java -jar target/workable-backend-0.0.1-SNAPSHOT.jar
```

## 📞 Support

For issues and questions, please refer to the project documentation or create an issue in the repository.
