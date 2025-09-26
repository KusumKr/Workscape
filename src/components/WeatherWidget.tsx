import React, { useEffect, useState } from 'react';
import './WeatherWidget.css';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
  };
  name: string;
}

interface WeatherWidgetProps {
  cityName: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ cityName }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Replace with your OpenWeatherMap API key
  const API_KEY = '3a0b9f5fe268bde8d03fdf33d8089682'; 

  useEffect(() => {
    console.log('WeatherWidget mounted with city:', cityName);
    if (!cityName) {
      const errorMsg = 'No city specified';
      console.error(errorMsg);
      setError(errorMsg);
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Encode city name and create URL with our CRA proxy
        const encodedCityName = encodeURIComponent(cityName.trim());
        // Using CRA proxy to avoid CORS issues
        const url = `/api/weather?q=${encodedCityName}&appid=${API_KEY}&units=metric`;
        
        console.log('Fetching weather from:', url);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          },
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('API Error:', errorData);
          
          if (response.status === 401) {
            throw new Error('Invalid API Key. Please check your OpenWeatherMap API key.');
          } else if (response.status === 404) {
            throw new Error(`Weather data not found for "${cityName}". Please check the city name.`);
          } else if (response.status === 429) {
            throw new Error('API rate limit exceeded. Please try again later.');
          } else {
            throw new Error(`Error ${response.status}: ${response.statusText}. ${errorData.message || ''}`);
          }
        }
        const data: WeatherData = await response.json();
        setWeather(data);
      } catch (err: any) {
        const errorMsg = err.message || 'Failed to fetch weather data';
        console.error('Weather fetch error:', {
          error: err,
          message: err.message,
          stack: err.stack,
          city: cityName
        });
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    if (cityName) {
      fetchWeather();
    }
  }, [cityName, API_KEY]);

  if (loading) return <div className="weather-widget loading">Loading weather data for {cityName}...</div>;
  if (error) return <div className="weather-widget error">Weather Unavailable: {error}</div>;

  if (!weather) {
    return <div className="weather-widget">No weather data available.</div>;
  }

  return (
    <div className="weather-widget">
      <h4>Current Weather in {weather.name}</h4>
      <div className="weather-info">
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt={weather.weather[0].description}
          className="weather-icon"
        />
        <p className="temperature">{weather.main.temp}°C</p>
        <p className="description">{weather.weather[0].description}</p>
      </div>
      <div className="weather-details">
        <p>Feels like: {weather.main.feels_like}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherWidget; 