// Weather & Location Services interfaces
export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  icon: string;
}

export interface LocationData {
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// OpenWeatherMap API interfaces
export interface OpenWeatherResponse {
  coord: {
    lat: number;
    lon: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
  };
  name: string;
}

// To-Do List interfaces
export interface TodoItem {
  id: string;
  title: string;
  text?: string; // For backward compatibility
  description?: string;
  completed: boolean;
  createdAt: string | Date;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  difficulty?: 'easy' | 'medium' | 'hard'; // For backward compatibility
}

// News Feed interfaces
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: Date;
  source: string;
  category: string;
}

// Authentication interfaces
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token?: string;
}

export interface LoginCredentials {
  email: string;
}

export interface VerificationCredentials {
  email: string;
  code: string;
}
