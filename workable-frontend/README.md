# 🎨 Workable Frontend - React Dashboard

<div align="center">

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=node.js)

**A modern, responsive React dashboard with real-time weather, news, and task management**

[🚀 Live Demo](#) • [📖 Documentation](#) • [🎨 Design System](#design-system)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎨 Design System](#design-system)
- [🚀 Quick Start](#-quick-start)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#configuration)
- [📱 Components](#-components)
- [🎯 State Management](#-state-management)
- [🔒 Authentication](#-authentication)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🐛 Troubleshooting](#-troubleshooting)

---

## ✨ Features

### 🌦 **Real-Time Weather Dashboard**
- **Automatic Location Detection** - Uses browser Geolocation API for precise location
- **GPS Accuracy Display** - Shows location accuracy in meters with color coding
- **Manual City Search** - Fallback for location permission denied
- **OpenWeatherMap Integration** - Real weather data from 200,000+ cities
- **Weather Details** - Temperature, humidity, wind speed, conditions, feels like
- **Dynamic Weather Icons** - Beautiful weather representation with OpenWeatherMap icons
- **Location Tips** - User guidance for better location accuracy

### 📰 **Live News Feed**
- **NewsAPI Integration** - Real-time news from global sources
- **Category Filtering** - Technology, Business, Sports, Entertainment, Health, Science, Politics
- **Infinite Scroll** - "Load More" functionality with pagination
- **Responsive Grid Layout** - Optimized for all screen sizes
- **Source Attribution** - Proper news source linking and metadata
- **Loading States** - Skeleton screens and progress indicators
- **Error Recovery** - Graceful fallbacks for API failures

### ✅ **Smart Todo Management**
- **User-Specific Tasks** - Each user sees only their own todos
- **Full CRUD Operations** - Create, Read, Update, Delete todos
- **Priority Levels** - LOW, MEDIUM, HIGH with color coding and icons
- **Real-time Updates** - Instant status changes and modifications
- **Filter Options** - All, Active, Completed views
- **Inline Editing** - Click to edit with keyboard shortcuts (Enter/Escape)
- **Persistent Storage** - Data saved to backend with user association

### 🔐 **Advanced Authentication**
- **JWT Token Security** - Secure, stateless authentication
- **Email-Based Login** - Simple authentication using email addresses
- **Account Management** - Email change with complete data transfer
- **Session Persistence** - Automatic login restoration
- **Protected Routes** - Secure access to user-specific data
- **Profile Management** - User profile with email editing capabilities

### 🎨 **Modern UI/UX**
- **Responsive Design** - Mobile-first approach, works on all devices
- **Dark/Light Theme Ready** - Prepared for theme switching
- **Smooth Animations** - Professional transitions and micro-interactions
- **Loading States** - Skeleton screens and progress indicators
- **Error Handling** - User-friendly error messages and recovery
- **Accessibility** - ARIA labels and keyboard navigation
- **Professional Design** - Clean, modern interface with consistent styling

---

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors */
--primary-blue: #3B82F6;      /* Main brand color */
--primary-emerald: #10B981;   /* Success/positive actions */
--primary-red: #EF4444;       /* Danger/delete actions */
--primary-yellow: #F59E0B;    /* Warning/attention */

/* Neutral Colors */
--gray-50: #F9FAFB;          /* Background */
--gray-100: #F3F4F6;         /* Light borders */
--gray-200: #E5E7EB;         /* Borders */
--gray-300: #D1D5DB;         /* Disabled text */
--gray-400: #9CA3AF;         /* Placeholder text */
--gray-500: #6B7280;         /* Secondary text */
--gray-600: #4B5563;         /* Body text */
--gray-700: #374151;         /* Headings */
--gray-800: #1F2937;         /* Dark text */
--gray-900: #111827;         /* Primary text */
```

### **Typography**
```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Font Sizes */
text-xs: 0.75rem;    /* 12px */
text-sm: 0.875rem;   /* 14px */
text-base: 1rem;     /* 16px */
text-lg: 1.125rem;   /* 18px */
text-xl: 1.25rem;    /* 20px */
text-2xl: 1.5rem;    /* 24px */
text-3xl: 1.875rem;  /* 30px */
text-4xl: 2.25rem;   /* 36px */
```

### **Spacing System**
```css
/* 8px Grid System */
space-1: 0.25rem;   /* 4px */
space-2: 0.5rem;    /* 8px */
space-3: 0.75rem;   /* 12px */
space-4: 1rem;      /* 16px */
space-5: 1.25rem;   /* 20px */
space-6: 1.5rem;    /* 24px */
space-8: 2rem;      /* 32px */
space-10: 2.5rem;   /* 40px */
space-12: 3rem;     /* 48px */
space-16: 4rem;     /* 64px */
```

### **Component Library**

#### **Cards**
```css
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6;
}

.card-hover {
  @apply hover:shadow-md hover:border-gray-300 transition-all duration-200;
}
```

#### **Buttons**
```css
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
         transition-colors duration-200;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 
         focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 
         transition-colors duration-200;
}

.btn-danger {
  @apply bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 
         focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 
         transition-colors duration-200;
}
```

#### **Forms**
```css
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md 
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
         transition-colors duration-200;
}

.input-error {
  @apply border-red-300 focus:ring-red-500 focus:border-red-500;
}
```

### **Responsive Breakpoints**
```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

---

## 🚀 Quick Start

### **Prerequisites**
- **Node.js 18** or higher
- **npm** or **yarn** package manager
- **Git** for version control

### **1. Clone and Setup**
```bash
# Clone the repository
git clone https://github.com/yourusername/workable.git
cd workable/workable-frontend

# Install dependencies
npm install
# or
yarn install
```

### **2. Environment Configuration**
Create `.env` file in the root directory:
```env
# Backend API URL
REACT_APP_API_URL=http://localhost:8080

# External API Keys (optional - backend handles these)
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
REACT_APP_NEWS_API_KEY=your_newsapi_key

# Development settings
REACT_APP_ENV=development
REACT_APP_DEBUG=true
```

### **3. Start Development Server**
```bash
# Start development server
npm start
# or
yarn start
```

**Application will open at:** `http://localhost:3000`

### **4. Build for Production**
```bash
# Create production build
npm run build
# or
yarn build

# Preview production build
npm run serve
# or
yarn serve
```

### **5. First Login**
- Open `http://localhost:3000`
- Enter any email address (e.g., `user@example.com`)
- System will automatically create your account
- Start using the dashboard!

---

## 🛠 Tech Stack

| Technology | Version | Purpose | Documentation |
|------------|---------|---------|---------------|
| **React** | 19.0.0 | UI Framework | [React Docs](https://react.dev/) |
| **TypeScript** | 5.0.0 | Type Safety | [TypeScript Docs](https://www.typescriptlang.org/) |
| **Tailwind CSS** | 3.3.0 | Styling Framework | [Tailwind Docs](https://tailwindcss.com/) |
| **React Router** | 6.8.0 | Navigation | [React Router Docs](https://reactrouter.com/) |
| **Fetch API** | Native | HTTP Client | [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) |
| **Geolocation API** | Native | Location Services | [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) |

### **Key Dependencies**
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "react-router-dom": "^6.8.0",
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0"
}
```

### **Development Dependencies**
```json
{
  "@types/node": "^20.0.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0",
  "eslint": "^8.0.0",
  "prettier": "^3.0.0"
}
```

---

## 📁 Project Structure

```
src/
├── 📁 components/              # React components
│   ├── LoginModal.tsx         # Authentication modal
│   ├── Navigation.tsx         # Main navigation bar
│   ├── NewsFeed.tsx          # News articles component
│   ├── ProfileMenu.tsx       # User profile menu
│   ├── ProtectedRoute.tsx    # Route protection wrapper
│   ├── TodoList.tsx          # Todo management component
│   └── WeatherLocation.tsx   # Weather dashboard component
│
├── 📁 contexts/               # React contexts
│   └── AuthContext.tsx       # Authentication state management
│
├── 📁 types/                  # TypeScript type definitions
│   └── index.ts              # Shared type definitions
│
├── 📁 styles/                 # Global styles
│   ├── index.css             # Main stylesheet
│   └── tailwind.css          # Tailwind CSS imports
│
├── App.tsx                   # Main application component
├── App.css                   # Application-specific styles
├── index.tsx                 # Application entry point
└── reportWebVitals.ts        # Performance monitoring
```

### **Component Architecture**
```
App.tsx
├── AuthContext.Provider
│   ├── Navigation
│   │   ├── ProfileMenu
│   │   └── LoginModal
│   ├── ProtectedRoute
│   │   ├── WeatherLocation
│   │   ├── NewsFeed
│   │   └── TodoList
│   └── Error Boundaries
```

---

## 🔧 Configuration

### **Environment Variables**

#### **Development (.env.development)**
```env
# Backend API
REACT_APP_API_URL=http://localhost:8080

# External APIs (optional)
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
REACT_APP_NEWS_API_KEY=your_newsapi_key

# Development settings
REACT_APP_ENV=development
REACT_APP_DEBUG=true
REACT_APP_LOG_LEVEL=debug
```

#### **Production (.env.production)**
```env
# Backend API
REACT_APP_API_URL=https://your-backend-domain.com

# External APIs
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
REACT_APP_NEWS_API_KEY=your_newsapi_key

# Production settings
REACT_APP_ENV=production
REACT_APP_DEBUG=false
REACT_APP_LOG_LEVEL=error
```

### **Tailwind CSS Configuration**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    },
  },
  plugins: [],
}
```

### **TypeScript Configuration**
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

---

## 📱 Components

### **WeatherLocation Component**
```typescript
interface WeatherLocationProps {
  className?: string;
}

const WeatherLocation: React.FC<WeatherLocationProps> = ({ className }) => {
  // Geolocation API integration
  // OpenWeatherMap API calls
  // Location accuracy display
  // Manual city search
  // Weather data visualization
}
```

**Features:**
- **Automatic Location Detection** - Browser Geolocation API
- **GPS Accuracy Display** - Shows accuracy in meters
- **Manual City Search** - Fallback for location permission
- **Weather Details** - Temperature, humidity, wind speed
- **Dynamic Icons** - OpenWeatherMap weather icons
- **Error Handling** - Graceful fallbacks

### **NewsFeed Component**
```typescript
interface NewsFeedProps {
  category?: string;
  pageSize?: number;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ category, pageSize = 10 }) => {
  // NewsAPI integration
  // Category filtering
  // Pagination
  // Infinite scroll
  // Loading states
}
```

**Features:**
- **Category Filtering** - Technology, Business, Sports, etc.
- **Infinite Scroll** - Load more functionality
- **Responsive Grid** - Optimized for all screens
- **Source Attribution** - Proper news source linking
- **Loading States** - Skeleton screens
- **Error Recovery** - Fallback mechanisms

### **TodoList Component**
```typescript
interface TodoListProps {
  userId?: string;
}

const TodoList: React.FC<TodoListProps> = ({ userId }) => {
  // CRUD operations
  // Priority levels
  // Filter options
  // Inline editing
  // Real-time updates
}
```

**Features:**
- **User-Specific Todos** - Each user sees their own tasks
- **Priority Levels** - LOW, MEDIUM, HIGH with colors
- **Filter Options** - All, Active, Completed
- **Inline Editing** - Click to edit with shortcuts
- **Real-time Updates** - Instant status changes
- **Persistent Storage** - Backend integration

### **ProfileMenu Component**
```typescript
interface ProfileMenuProps {
  userEmail?: string;
  onEmailChange?: (newEmail: string) => void;
  onSignInClick?: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ 
  userEmail, 
  onEmailChange, 
  onSignInClick 
}) => {
  // Email editing
  // Account management
  // Confirmation dialogs
  // Data transfer
}
```

**Features:**
- **Email Management** - Change email with data transfer
- **Confirmation Dialogs** - Warning before email deletion
- **Account Deletion** - Complete old account removal
- **Data Transfer** - Todos moved to new account
- **Session Management** - Token refresh and storage

---

## 🎯 State Management

### **Authentication Context**
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  token?: string;
}
```

### **State Flow**
```
User Action → Context Update → Component Re-render → UI Update
     ↓
API Call → Backend Response → State Update → UI Refresh
```

### **Local Storage Management**
```typescript
// Token storage
localStorage.setItem('sessionToken', token);
localStorage.setItem('userData', JSON.stringify(user));

// Token retrieval
const token = localStorage.getItem('sessionToken');
const userData = JSON.parse(localStorage.getItem('userData') || '{}');

// Token cleanup
localStorage.removeItem('sessionToken');
localStorage.removeItem('userData');
```

---

## 🔒 Authentication

### **Authentication Flow**
1. **User Login** → Enter email address
2. **Backend Validation** → Email/password check
3. **JWT Generation** → Secure token creation
4. **Token Storage** → Local storage persistence
5. **Route Protection** → Protected component access
6. **Token Validation** → Automatic token verification

### **Protected Routes**
```typescript
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};
```

### **API Authentication**
```typescript
const apiCall = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('sessionToken');
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  };
  
  const response = await fetch(url, config);
  
  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userData');
    window.location.reload();
  }
  
  return response;
};
```

---

## 🧪 Testing

### **Unit Testing**
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- --testPathPattern=TodoList.test.tsx

# Watch mode
npm test -- --watch
```

### **Component Testing**
```typescript
// TodoList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList', () => {
  test('renders todo list', () => {
    render(<TodoList />);
    expect(screen.getByText('My Todos')).toBeInTheDocument();
  });
  
  test('creates new todo', async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo...');
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13 });
    expect(await screen.findByText('Test todo')).toBeInTheDocument();
  });
});
```

### **Integration Testing**
```typescript
// WeatherLocation.test.tsx
describe('WeatherLocation', () => {
  test('fetches weather data', async () => {
    render(<WeatherLocation />);
    expect(screen.getByText('Loading weather...')).toBeInTheDocument();
    expect(await screen.findByText(/°C/)).toBeInTheDocument();
  });
});
```

### **E2E Testing**
```bash
# Install Cypress
npm install --save-dev cypress

# Run Cypress
npx cypress open

# Run headless
npx cypress run
```

---

## 🚀 Deployment

### **Build Process**
```bash
# Create production build
npm run build

# Build analysis
npm run analyze

# Preview build
npm run serve
```

### **Netlify Deployment**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=build

# Set environment variables
netlify env:set REACT_APP_API_URL https://your-backend-domain.com
```

### **Vercel Deployment**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod

# Set environment variables
vercel env add REACT_APP_API_URL
```

### **Docker Deployment**
```dockerfile
# Dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### **Environment Configuration**
```bash
# Production environment variables
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

---

## 🐛 Troubleshooting

### **Common Issues**

#### **CORS Errors**
```bash
# Check backend CORS configuration
# Ensure backend allows frontend origin
# Verify API URL configuration
```

#### **Authentication Issues**
```bash
# Check JWT token in localStorage
localStorage.getItem('sessionToken')

# Verify backend authentication
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### **Geolocation Errors**
```javascript
// Check browser permissions
navigator.permissions.query({ name: 'geolocation' })
  .then(result => {
    if (result.state === 'denied') {
      console.log('Location permission denied');
    }
  });
```

#### **API Connection Issues**
```bash
# Test backend connectivity
curl http://localhost:8080/api/health

# Check environment variables
echo $REACT_APP_API_URL
```

### **Performance Optimization**
```javascript
// Lazy loading components
const TodoList = React.lazy(() => import('./components/TodoList'));
const NewsFeed = React.lazy(() => import('./components/NewsFeed'));

// Memoization
const MemoizedWeatherLocation = React.memo(WeatherLocation);

// Code splitting
const WeatherLocation = React.lazy(() => import('./components/WeatherLocation'));
```

### **Debug Mode**
```javascript
// Enable debug logging
if (process.env.REACT_APP_DEBUG === 'true') {
  console.log('Debug mode enabled');
  console.log('API URL:', process.env.REACT_APP_API_URL);
}
```

---

<div align="center">

**Built with ❤️ using React & TypeScript**

[📖 Full Documentation](#) • [🐛 Report Issues](#) • [💡 Request Features](#)

</div>
