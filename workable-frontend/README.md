# Workable Dashboard

A modern, responsive React dashboard application with Weather, News, and Todo components built with TypeScript and Tailwind CSS.

## ✨ Features

### 🌦 Weather Component
- **Mock weather data** with realistic simulation
- Geolocation simulation with manual city search
- Beautiful weather cards with gradients
- Loading states and error handling
- Temperature, humidity, wind speed, and weather conditions
- **Ready for OpenWeatherMap API integration**

### 📰 News Component
- **Mock news data** with multiple categories
- Category filtering (Technology, Business, Sports, etc.)
- Responsive grid layout with hover effects
- Pagination with "Load More" functionality
- Loading skeletons and error states
- **Ready for NewsAPI integration**

### ✅ Todo Component
- Full CRUD operations (Create, Read, Update, Delete)
- localStorage persistence
- Filter by All/Active/Completed
- Priority indicators with color coding
- Smooth animations and transitions
- Inline editing with keyboard shortcuts

### 🎨 Design System
- Modern, consistent UI with Inter font
- Responsive design (mobile-first)
- Smooth transitions and hover effects
- Gradient backgrounds and subtle shadows
- Professional dashboard feel

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd workable-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the application:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 🛠 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **localStorage** - Data persistence
- **Mock Data** - Frontend development

## 📱 Responsive Design

The application is fully responsive and works on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🎯 Key Features

### Weather Dashboard
- Simulated geolocation detection
- Manual city search with random weather data
- Real-time weather simulation
- Beautiful weather icons
- Detailed weather information

### News Feed
- Multiple news categories with mock data
- Category filtering and pagination
- Responsive grid layout
- External link handling
- Source attribution

### Todo Management
- Persistent storage with localStorage
- Priority levels with visual indicators
- Filtering options (All/Active/Completed)
- Keyboard shortcuts (Enter to save, Escape to cancel)
- Smooth animations and transitions

## 🔧 Future API Integration

### OpenWeatherMap API
When ready to integrate real weather data:

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key
3. Create a `.env` file:
```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
```
4. Update the Weather component to use real API calls

### NewsAPI
When ready to integrate real news data:

1. Sign up at [NewsAPI](https://newsapi.org/)
2. Get your API key
3. Add to your `.env` file:
```env
REACT_APP_NEWS_API_KEY=your_newsapi_key_here
```
4. Update the News component to use real API calls

## 🎨 Design System

### Colors
The design system uses a consistent color palette:
- Primary: Blue (#3B82F6)
- Secondary: Emerald (#10B981)
- Background: Gray (#F9FAFB)

### Typography
- Font: Inter (Google Fonts)
- Headings: text-gray-900
- Body: text-gray-700
- Muted: text-gray-500

### Components
- Cards with rounded corners and shadows
- Gradient headers
- Smooth hover transitions
- Loading spinners and skeletons
- Error states with proper messaging

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.
