# API Setup Instructions

This application uses real APIs for weather and news data. You need to obtain API keys and configure them in the application.

## Required API Keys

### 1. OpenWeatherMap API
- **Purpose**: Provides real-time weather data
- **Get API Key**: 
  1. Go to [OpenWeatherMap](https://openweathermap.org/api)
  2. Sign up for a free account
  3. Navigate to "API keys" section
  4. Copy your API key

### 2. NewsAPI
- **Purpose**: Provides real-time news articles
- **Get API Key**:
  1. Go to [NewsAPI](https://newsapi.org/)
  2. Sign up for a free account
  3. Copy your API key from the dashboard

## Configuration

1. Open `src/main/resources/application.properties`
2. Replace the placeholder values with your actual API keys:

```properties
# OpenWeatherMap API
app.weather.api-key=YOUR_ACTUAL_OPENWEATHERMAP_API_KEY

# NewsAPI
app.news.api-key=f1858b54924a4436aea69ef75f1fe3f2
```

## API Limits (Free Tiers)

### OpenWeatherMap
- 1,000 calls per day
- 60 calls per minute

### NewsAPI
- 1,000 requests per day
- Rate limited

## Features

### Weather Service
- Fetches real-time weather data for any city
- Caches data for 30 minutes to reduce API calls
- Requires valid OpenWeatherMap API key to function
- Supports temperature, humidity, wind speed, and weather descriptions

### News Service
- Fetches latest news articles from various categories
- Automatically categorizes articles based on source
- Caches articles in database to reduce API calls
- Supports categories: Technology, Business, Sports, General
- Requires valid NewsAPI key to function

## Error Handling

Both services require valid API keys to function:
- Invalid or missing API keys will cause the services to fail
- Network issues will result in service unavailability
- Rate limiting is respected through caching

## Testing

After setting up your API keys, you can test the endpoints:

```bash
# Test weather API
curl "http://localhost:8080/api/weather?city=London"

# Test news API
curl "http://localhost:8080/api/news?page=0&size=10"
```

## Important Notes

- **No Mock Data**: The application no longer includes any demo or mock data
- **API Dependency**: Both services require valid API keys to function
- **Real-time Data**: All data comes from live APIs
- **Caching**: Data is cached to respect API rate limits and improve performance
