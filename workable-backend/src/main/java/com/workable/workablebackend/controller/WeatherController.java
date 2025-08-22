package com.workable.workablebackend.controller;

import com.workable.workablebackend.dto.WeatherDto;
import com.workable.workablebackend.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping
    public ResponseEntity<WeatherDto> getWeather(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lng) {
        
        if (lat != null && lng != null) {
            // Get weather by coordinates
            WeatherDto weather = weatherService.getWeatherByCoordinates(lat, lng);
            return ResponseEntity.ok(weather);
        } else if (city != null && !city.trim().isEmpty()) {
            // Get weather by city name
            WeatherDto weather = weatherService.getWeatherByCity(city);
            return ResponseEntity.ok(weather);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
