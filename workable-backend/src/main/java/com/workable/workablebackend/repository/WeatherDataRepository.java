package com.workable.workablebackend.repository;

import com.workable.workablebackend.model.WeatherData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface WeatherDataRepository extends JpaRepository<WeatherData, Long> {
    Optional<WeatherData> findFirstByCityOrderByCreatedAtDesc(String city);
    Optional<WeatherData> findByCityAndCreatedAtAfter(String city, LocalDateTime after);
}
