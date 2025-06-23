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
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Invalid API Key. Please replace YOUR_OPENWEATHERMAP_API_KEY with a valid key.');
          } else if (response.status === 404) {
            throw new Error(`Weather data not found for ${cityName}.`);
          } else {
            throw new Error(`Error: ${response.statusText}`);
          }
        }
        const data: WeatherData = await response.json();
        setWeather(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (cityName) {
      fetchWeather();
    }
  }, [cityName, API_KEY]);

  if (loading) {
    return <div className="weather-widget">Loading weather...</div>;
  }

  if (error) {
    return <div className="weather-widget error">Error: {error}</div>;
  }

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