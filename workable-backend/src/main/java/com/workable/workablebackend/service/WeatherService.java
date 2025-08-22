package com.workable.workablebackend.service;

import com.workable.workablebackend.model.WeatherData;
import com.workable.workablebackend.repository.WeatherDataRepository;
import com.workable.workablebackend.dto.WeatherDto;
import com.workable.workablebackend.dto.OpenWeatherResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class WeatherService {

    private final WeatherDataRepository weatherDataRepository;
    private final RestTemplate restTemplate;

    @Value("${app.weather.api-key:}")
    private String apiKey;

    @Value("${app.weather.base-url:}")
    private String baseUrl;

    @Autowired
    public WeatherService(WeatherDataRepository weatherDataRepository, RestTemplate restTemplate) {
        this.weatherDataRepository = weatherDataRepository;
        this.restTemplate = restTemplate;
    }

    public WeatherDto getWeatherByCity(String city) {
        // Check if API is properly configured
        if (apiKey == null || apiKey.isEmpty() || apiKey.equals("YOUR_OPENWEATHERMAP_API_KEY") || 
            baseUrl == null || baseUrl.isEmpty()) {
            throw new RuntimeException("Weather API not configured. Please add a valid OpenWeatherMap API key to application.properties");
        }

        // Check if we have recent data (within last 30 minutes)
        Optional<WeatherData> recentData = weatherDataRepository.findByCityAndCreatedAtAfter(
            city, LocalDateTime.now().minusMinutes(30));
        
        if (recentData.isPresent()) {
            WeatherData data = recentData.get();
            return convertToDto(data);
        }

        // Fetch fresh data from API
        String url = UriComponentsBuilder
            .fromHttpUrl(baseUrl + "/weather")
            .queryParam("q", city)
            .queryParam("appid", apiKey)
            .queryParam("units", "metric")
            .build()
            .toUriString();

        OpenWeatherResponse response = restTemplate.getForObject(url, OpenWeatherResponse.class);
        
        if (response != null && response.getMain() != null) {
            WeatherData weatherData = new WeatherData();
            weatherData.setCity(city);
            weatherData.setCountry(response.getSys().getCountry());
            weatherData.setTemperature(response.getMain().getTemp());
            weatherData.setFeelsLike(response.getMain().getFeelsLike());
            weatherData.setHumidity(response.getMain().getHumidity());
            weatherData.setWindSpeed(response.getWind().getSpeed());
            
            if (response.getWeather() != null && !response.getWeather().isEmpty()) {
                OpenWeatherResponse.Weather weather = response.getWeather().get(0);
                weatherData.setDescription(weather.getDescription());
                weatherData.setIcon(weather.getIcon());
            }
            
            weatherData.setCreatedAt(LocalDateTime.now());
            
            WeatherData savedData = weatherDataRepository.save(weatherData);
            return convertToDto(savedData);
        } else {
            throw new RuntimeException("Failed to fetch weather data for city: " + city);
        }
    }

    public WeatherDto getWeatherByCoordinates(double lat, double lng) {
        // Check if API is properly configured
        if (apiKey == null || apiKey.isEmpty() || apiKey.equals("YOUR_OPENWEATHERMAP_API_KEY") || 
            baseUrl == null || baseUrl.isEmpty()) {
            throw new RuntimeException("Weather API not configured. Please add a valid OpenWeatherMap API key to application.properties");
        }

        // Fetch fresh data from API using coordinates
        String url = UriComponentsBuilder
            .fromHttpUrl(baseUrl + "/weather")
            .queryParam("lat", lat)
            .queryParam("lon", lng)
            .queryParam("appid", apiKey)
            .queryParam("units", "metric")
            .build()
            .toUriString();

        OpenWeatherResponse response = restTemplate.getForObject(url, OpenWeatherResponse.class);
        
        if (response != null && response.getMain() != null) {
            WeatherData weatherData = new WeatherData();
            weatherData.setCity(response.getName()); // Use the city name from API response
            weatherData.setCountry(response.getSys().getCountry());
            weatherData.setTemperature(response.getMain().getTemp());
            weatherData.setFeelsLike(response.getMain().getFeelsLike());
            weatherData.setHumidity(response.getMain().getHumidity());
            weatherData.setWindSpeed(response.getWind().getSpeed());
            
            if (response.getWeather() != null && !response.getWeather().isEmpty()) {
                OpenWeatherResponse.Weather weather = response.getWeather().get(0);
                weatherData.setDescription(weather.getDescription());
                weatherData.setIcon(weather.getIcon());
            }
            
            weatherData.setCreatedAt(LocalDateTime.now());
            
            WeatherData savedData = weatherDataRepository.save(weatherData);
            return convertToDto(savedData);
        } else {
            throw new RuntimeException("Failed to fetch weather data for coordinates: " + lat + ", " + lng);
        }
    }

    private WeatherDto convertToDto(WeatherData weatherData) {
        return new WeatherDto(
            weatherData.getCity(),
            weatherData.getCountry(),
            weatherData.getTemperature(),
            weatherData.getFeelsLike(),
            weatherData.getHumidity(),
            weatherData.getWindSpeed(),
            weatherData.getDescription(),
            weatherData.getIcon(),
            weatherData.getCreatedAt()
        );
    }
}
