import React, { useState, useEffect } from 'react';
import { WeatherData, LocationData } from '../types';

interface WeatherLocationProps {
  weatherData?: WeatherData;
  locationData?: LocationData;
}

const WeatherLocation: React.FC<WeatherLocationProps> = ({ weatherData, locationData }) => {
  const [weather, setWeather] = useState<WeatherData | null>(weatherData || null);
  const [location, setLocation] = useState<LocationData | null>(locationData || null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);

  // Get user's current location using Geolocation API
  const getUserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          console.log('Location obtained:', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp).toLocaleString()
          });
          resolve(position);
        },
        (error: GeolocationPositionError) => {
          console.error('Geolocation error:', error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('Location permission denied. Please enable location access.'));
              setLocationPermission('denied');
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Location information unavailable.'));
              break;
            case error.TIMEOUT:
              reject(new Error('Location request timed out.'));
              break;
            default:
              reject(new Error('An unknown error occurred while getting location.'));
          }
        },
        {
          enableHighAccuracy: true, // Use GPS when available
          timeout: 15000, // 15 seconds timeout
          maximumAge: 0 // Don't use cached position
        }
      );
    });
  };

  // Fetch weather data by coordinates
  const fetchWeatherByCoordinates = async (lat: number, lng: number, accuracy?: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:8080/api/weather?lat=${lat}&lng=${lng}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const weatherData: WeatherData = {
        temperature: data.temperature,
        condition: data.description,
        humidity: data.humidity,
        windSpeed: data.windSpeed,
        location: `${data.city}, ${data.country}`,
        icon: `https://openweathermap.org/img/wn/${data.icon}@2x.png`
      };

      const locationData: LocationData = {
        city: data.city,
        country: data.country,
        coordinates: {
          lat: lat,
          lng: lng
        }
      };

      setWeather(weatherData);
      setLocation(locationData);
      
      // Log location accuracy for debugging
      if (accuracy) {
        console.log(`Location accuracy: ${accuracy} meters`);
        if (accuracy > 1000) {
          console.warn('Low accuracy location detected. Consider using manual city search for better results.');
        }
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data for your location. Please try searching for a city.');
    } finally {
      setLoading(false);
    }
  };

  // Real API call to backend for city search
  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:8080/api/weather?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const weatherData: WeatherData = {
        temperature: data.temperature,
        condition: data.description,
        humidity: data.humidity,
        windSpeed: data.windSpeed,
        location: `${data.city}, ${data.country}`,
        icon: `https://openweathermap.org/img/wn/${data.icon}@2x.png`
      };

      const locationData: LocationData = {
        city: data.city,
        country: data.country,
        coordinates: {
          lat: 0, // Not provided by current API
          lng: 0  // Not provided by current API
        }
      };

      setWeather(weatherData);
      setLocation(locationData);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle city search
  const fetchWeatherByCity = async (city: string) => {
    if (city.trim()) {
      await fetchWeatherData(city.trim());
      setSearchCity('');
      setShowSearch(false);
    }
  };

  // Get user's current location and fetch weather
  const getCurrentLocationWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const position = await getUserLocation();
      const { latitude, longitude, accuracy } = position.coords;
      
      await fetchWeatherByCoordinates(latitude, longitude, accuracy);
      setLocationPermission('granted');
      setLocationAccuracy(accuracy);
    } catch (err) {
      console.error('Error getting location:', err);
      setError(err instanceof Error ? err.message : 'Failed to get your location');
      setLoading(false);
    }
  };

  // Get more accurate location (with longer timeout)
  const getAccurateLocationWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use a more accurate geolocation request
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by this browser'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            console.log('Accurate location obtained:', {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: new Date(position.timestamp).toLocaleString()
            });
            resolve(position);
          },
          (error: GeolocationPositionError) => {
            reject(new Error(`Location error: ${error.message}`));
          },
          {
            enableHighAccuracy: true,
            timeout: 30000, // 30 seconds for better accuracy
            maximumAge: 0
          }
        );
      });
      
      const { latitude, longitude, accuracy } = position.coords;
      await fetchWeatherByCoordinates(latitude, longitude, accuracy);
      setLocationPermission('granted');
      setLocationAccuracy(accuracy);
    } catch (err) {
      console.error('Error getting accurate location:', err);
      setError(err instanceof Error ? err.message : 'Failed to get accurate location');
      setLoading(false);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeatherByCity(searchCity.trim());
    }
  };

  // Load weather data on component mount
  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="card animate-fade-in">
          <div className="card-header">
            <h2 className="text-2xl font-bold text-white">Weather Dashboard</h2>
            <p className="text-white/80 mt-1">Current weather information</p>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-center py-12">
              <div className="loading-spinner"></div>
              <span className="ml-3 text-gray-600">Detecting your location and loading weather data...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !weather) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="card animate-fade-in">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Weather Dashboard</h2>
            <p className="text-red-100 mt-1">Error loading weather data</p>
          </div>
          <div className="p-6 md:p-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                  {locationPermission === 'denied' && (
                    <p className="text-xs text-red-600 mt-1">
                      Please enable location access in your browser settings to get weather for your current location.
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={getCurrentLocationWeather}
                className="btn-primary"
                disabled={locationPermission === 'denied'}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {locationPermission === 'denied' ? 'Location Blocked' : 'Try Again'}
              </button>
              <button
                onClick={() => setShowSearch(true)}
                className="btn-secondary"
              >
                Search City
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="card animate-fade-in">
        {/* Header */}
        <div className="card-header">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">Weather Dashboard</h2>
              <p className="text-white/80 mt-1">Current weather information</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="px-3 py-1 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
              >
                {showSearch ? 'Cancel' : 'Search'}
              </button>
              <button
                onClick={getAccurateLocationWeather}
                className="px-3 py-1 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
                title="Get more accurate weather for your current location"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search Form */}
        {showSearch && (
          <div className="p-6 border-b border-gray-100">
            <form onSubmit={handleSearchSubmit} className="flex gap-3">
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Enter city name..."
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary">
                Search
              </button>
            </form>
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {weather && location && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weather Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Weather</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temperature</span>
                    <div className="flex items-center">
                      <img 
                        src={weather.icon} 
                        alt={weather.condition}
                        className="w-12 h-12 mr-3"
                      />
                      <span className="text-3xl font-bold text-gray-900">{weather.temperature}°C</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Condition</span>
                    <span className="text-gray-900 font-medium capitalize">{weather.condition}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Humidity</span>
                    <span className="text-gray-900">{weather.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Wind Speed</span>
                    <span className="text-gray-900">{weather.windSpeed} m/s</span>
                  </div>
                </div>
            </div>

            {/* Location Section */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">City</span>
                    <span className="text-gray-900 font-medium">{location.city}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Country</span>
                    <span className="text-gray-900">{location.country}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="text-gray-900">{weather.location}</span>
                  </div>
                  {location.coordinates.lat !== 0 && location.coordinates.lng !== 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Coordinates</span>
                      <span className="text-gray-900 text-sm">
                        {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                      </span>
                    </div>
                  )}
                  {locationAccuracy && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Accuracy</span>
                      <span className={`text-sm ${locationAccuracy <= 100 ? 'text-green-600' : locationAccuracy <= 1000 ? 'text-yellow-600' : 'text-red-600'}`}>
                        ±{locationAccuracy.toFixed(0)} meters
                        {locationAccuracy > 1000 && ' (Low accuracy)'}
                      </span>
                    </div>
                  )}
                  {location.coordinates.lat !== 0 && location.coordinates.lng !== 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center text-sm text-blue-700">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          <strong>Location Tip:</strong> If the location seems incorrect, try refreshing the page or use the search feature to find your exact city.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
            </div>
          </div>
          )}

          {/* Real API notice */}
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  <strong>Live Data:</strong> Connected to OpenWeatherMap API for real-time weather information based on your location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherLocation;
