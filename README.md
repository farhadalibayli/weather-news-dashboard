# 🌟 Workable - Modern Dashboard Platform

<div align="center">

![Workable Logo](https://img.shields.io/badge/Workable-Dashboard-blue?style=for-the-badge&logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.5-green?style=for-the-badge&logo=spring)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

**A modern, full-stack dashboard application with real-time weather, news, and task management**

### About
A web application with a Spring Boot backend and MySQL database. Features include:

- **Email-Based Authentication**: Simple login using email addresses with automatic account creation
- **Real-Time Weather**: Shows weather based on detected location or manual city search using OpenWeatherMap API
- **Live News Feed**: Displays news from various categories using NewsAPI with filtering and pagination
- **Smart Todo Management**: User-specific task management with priority levels and real-time updates
- **Account Management**: Email change functionality with complete data transfer and old account deletion

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗 Architecture](#-architecture)
- [🚀 Quick Start](#-quick-start)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [📚 API Documentation](#-api-documentation)
- [🎨 UI/UX Features](#-uiux-features)
- [🔒 Security](#-security)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🌦 **Real-Time Weather**
- **Automatic Location Detection** - Uses browser Geolocation API for precise GPS coordinates
- **OpenWeatherMap Integration** - Real weather data from 200,000+ cities worldwide
- **Location Accuracy Display** - Shows GPS accuracy in meters with color-coded indicators
- **Manual City Search** - Fallback for location permission denied with city name lookup
- **Weather Details** - Temperature, humidity, wind speed, conditions, feels like temperature
- **Dynamic Weather Icons** - Beautiful weather representation using OpenWeatherMap icons
- **Caching System** - Intelligent caching to reduce API calls and improve performance

### 📰 **Live News Feed**
- **NewsAPI Integration** - Real-time news from global sources with proper source attribution
- **Category Filtering** - Technology, Business, Sports, Entertainment, Health, Science, Politics
- **Pagination Support** - Efficient loading with "Load More" functionality and configurable page sizes
- **Responsive Grid Layout** - Optimized for all screen sizes with hover effects
- **Source Attribution** - Proper news source linking and metadata display
- **Caching System** - Intelligent caching to reduce API calls and minimize costs
- **Error Recovery** - Graceful fallbacks for API failures and network issues

### ✅ **Smart Todo Management**
- **User-Specific Tasks** - Each user sees only their own todos with secure data isolation
- **Priority Levels** - LOW, MEDIUM, HIGH with color coding and visual indicators
- **Real-time Updates** - Instant status changes and modifications with optimistic UI updates
- **Persistent Storage** - Data saved to MySQL database with user association and JPA/Hibernate
- **Filter Options** - All, Active, Completed views with dynamic filtering
- **Inline Editing** - Click to edit with keyboard shortcuts (Enter to save, Escape to cancel)
- **CRUD Operations** - Full Create, Read, Update, Delete functionality with validation

### 🔐 **Advanced Authentication**
- **JWT Token Security** - Secure, stateless authentication with configurable expiration
- **Email-Based Login** - Simple authentication using email addresses (no password required)
- **Automatic Account Creation** - New accounts created on first login
- **Account Management** - Email change with complete data transfer and old account deletion
- **Session Persistence** - Automatic login restoration using localStorage
- **Protected Routes** - Secure access to user-specific data with route protection

### 🎨 **Modern UI/UX**
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Dark/Light Theme Ready** - Prepared for theme switching
- **Smooth Animations** - Professional transitions and micro-interactions
- **Loading States** - Skeleton screens and progress indicators
- **Error Handling** - User-friendly error messages and recovery
- **Accessibility** - ARIA labels and keyboard navigation

---

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Spring Backend │    │   MySQL Database│
│                 │    │                 │    │                 │
│ • TypeScript    │◄──►│ • RESTful APIs  │◄──►│ • User Data     │
│ • Tailwind CSS  │    │ • JWT Security  │    │ • Todo Items    │
│ • Geolocation   │    │ • External APIs │    │ • Weather Cache │
│ • Real-time UI  │    │ • Data Caching  │    │ • News Cache    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **System Flow**
1. **Frontend** - React SPA with TypeScript, Tailwind CSS, and browser APIs (Geolocation, localStorage)
2. **Backend** - Spring Boot REST API with JWT authentication, Spring Security, and Spring Data JPA
3. **Database** - MySQL for persistent data storage with automatic schema management
4. **External APIs** - OpenWeatherMap (weather data) and NewsAPI (news articles) with intelligent caching
5. **Caching** - Multi-level caching (database, application, browser) to reduce API calls and improve performance

---

## 🚀 Quick Start

### **Prerequisites**
- Java 17+ 
- Node.js 18+
- MySQL 8.0+
- Maven 3.6+

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/workable.git
cd workable
```

### **2. Database Setup**
```sql
CREATE DATABASE workable_db;
CREATE USER 'workable_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON workable_db.* TO 'workable_user'@'localhost';
FLUSH PRIVILEGES;
```

### **3. Backend Configuration**
```bash
cd workable-backend
```

Update `src/main/resources/application.properties`:
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/workable_db
spring.datasource.username=workable_user
spring.datasource.password=your_password

# API Keys (Get free keys from the links below)
app.weather.api-key=YOUR_OPENWEATHERMAP_API_KEY
app.news.api-key=YOUR_NEWSAPI_KEY
```

**Get Free API Keys:**
- 🌦 [OpenWeatherMap API](https://openweathermap.org/api) - Weather data
- 📰 [NewsAPI](https://newsapi.org/) - News articles

### **4. Start Backend**
```bash
mvn spring-boot:run
```
Backend runs on: `http://localhost:8080`

### **5. Start Frontend**
```bash
cd workable-frontend
npm install
npm start
```
Frontend runs on: `http://localhost:3000`

### **6. First Login**
- Open `http://localhost:3000`
- Enter any email address (e.g., `user@example.com`)
- System will automatically create your account
- Start using the dashboard!

---

## 🛠 Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0.0 | UI Framework |
| **TypeScript** | 5.0.0 | Type Safety |
| **Tailwind CSS** | 3.3.0 | Utility-First CSS Framework |
| **React Router** | 6.8.0 | Client-Side Routing |
| **Fetch API** | Native | HTTP Client |
| **Geolocation API** | Native | Browser Location Services |
| **localStorage** | Native | Client-Side Data Persistence |

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Spring Boot** | 3.5.5 | Main Framework |
| **Spring Security** | 6.1.0 | Authentication & Authorization |
| **Spring Data JPA** | 3.1.0 | Database Access Layer |
| **MySQL** | 8.0.0 | Relational Database |
| **JWT** | 0.11.5 | Token-Based Authentication |
| **Lombok** | 1.18.26 | Code Generation |
| **RestTemplate** | 6.1.0 | HTTP Client for External APIs |
| **Maven** | 3.6+ | Build Tool & Dependency Management |

### **External APIs**
| Service | Purpose | Rate Limit |
|---------|---------|------------|
| **OpenWeatherMap** | Weather Data | 1000 calls/day (free) |
| **NewsAPI** | News Articles | 1000 calls/day (free) |

---

## 📁 Project Structure

```
workable/
├── 📁 workable-backend/          # Spring Boot Backend
│   ├── 📁 src/main/java/
│   │   └── 📁 com/workable/workablebackend/
│   │       ├── 📁 config/        # Configuration classes
│   │       ├── 📁 controller/    # REST controllers
│   │       ├── 📁 dto/          # Data Transfer Objects
│   │       ├── 📁 exception/    # Exception handling
│   │       ├── 📁 model/        # Entity models
│   │       ├── 📁 repository/   # Data access layer
│   │       ├── 📁 security/     # Security configuration
│   │       └── 📁 service/      # Business logic
│   ├── 📁 src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── 📁 workable-frontend/         # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/       # React components
│   │   ├── 📁 contexts/         # React contexts
│   │   ├── 📁 types/           # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## 🔧 Configuration

### **Environment Variables**

Create `.env` files for sensitive data:

**Backend (.env)**
```env
DB_USERNAME=workable_user
DB_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret_key
WEATHER_API_KEY=your_openweathermap_key
NEWS_API_KEY=your_newsapi_key
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_WEATHER_API_KEY=your_openweathermap_key
REACT_APP_NEWS_API_KEY=your_newsapi_key
```

### **Database Configuration**
```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/workable_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

# JWT Configuration
app.jwt-secret=${JWT_SECRET}
app.jwt-expiration-milliseconds=86400000

# API Configuration
app.weather.api-key=${WEATHER_API_KEY}
app.weather.base-url=https://api.openweathermap.org/data/2.5
app.news.api-key=${NEWS_API_KEY}
app.news.base-url=https://newsapi.org/v2
```

---

## 📚 API Documentation

### **Authentication Endpoints**

#### **Register/Login User**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### **Update Email**
```http
PUT /api/auth/update-email
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "newEmail": "newuser@example.com"
}
```

#### **Check Email Availability**
```http
GET /api/auth/check-email?email=user@example.com
```

### **Todo Endpoints**

#### **Get User Todos**
```http
GET /api/todos
GET /api/todos?completed=true
Authorization: Bearer <jwt_token>
```

#### **Create Todo**
```http
POST /api/todos
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the implementation",
  "priority": "HIGH"
}
```

#### **Update Todo**
```http
PUT /api/todos/{id}
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
PATCH /api/todos/{id}/toggle
Authorization: Bearer <jwt_token>
```

#### **Delete Todo**
```http
DELETE /api/todos/{id}
Authorization: Bearer <jwt_token>
```

### **Weather Endpoints**

#### **Get Weather by City**
```http
GET /api/weather?city=London
```

#### **Get Weather by Coordinates**
```http
GET /api/weather?lat=51.5074&lng=-0.1278
```

### **News Endpoints**

#### **Get All News**
```http
GET /api/news?page=0&size=10
```

#### **Get News by Category**
```http
GET /api/news/technology?page=0&size=10
```

**Available Categories:** `technology`, `business`, `sports`, `entertainment`, `health`, `science`, `politics`

---

## 🎨 UI/UX Features

### **Design System**
- **Color Palette**: Professional blue and emerald theme
- **Typography**: Inter font family for readability
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle elevation with CSS shadows
- **Animations**: Smooth transitions and micro-interactions

### **Responsive Breakpoints**
```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### **Component Library**
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, danger)
- **Forms**: Clean input fields with validation
- **Modals**: Overlay dialogs with backdrop blur
- **Loading**: Skeleton screens and spinners

---

## 🔒 Security

### **Authentication & Authorization**
- **JWT Tokens**: Secure, stateless authentication
- **Password Encryption**: BCrypt hashing
- **CORS Configuration**: Secure cross-origin requests
- **Protected Routes**: Role-based access control
- **Token Expiration**: Configurable session timeout

### **Data Protection**
- **Input Validation**: Server-side validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy
- **CSRF Protection**: Cross-Site Request Forgery prevention
- **Rate Limiting**: API request throttling

### **Privacy Features**
- **User Data Isolation**: Each user sees only their data
- **Email Uniqueness**: No duplicate email addresses
- **Account Deletion**: Complete data removal on email change
- **Session Management**: Secure token handling

---

## 🙏 Acknowledgments

- **OpenWeatherMap** for weather data API
- **NewsAPI** for news articles API
- **Spring Boot** team for the amazing framework
- **React** team for the UI library
- **Tailwind CSS** for the utility-first CSS framework
- **All contributors** who helped make this project better

---

<div align="center">

**Made with ❤️ by the Workable Team**

[⭐ Star this repo](#) • [🐛 Report a bug](#) • [💡 Request a feature](#)

</div>
