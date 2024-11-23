import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // Fetch weather data from Open-Meteo API
  const fetchWeatherData = async () => {
    if (!city) return;  // Do not search if the input is empty

    setLoading(true);
    setError('');
    try {
      // Fetch weather data from Open-Meteo API
      const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
        params: {
          latitude: 0,  // Use default coordinates (San Francisco)
          longitude: 0,
          current_weather: true,
          hourly: 'temperature_2m',
          forecast: '24h'
        },
      });

      if (response.data) {
        setWeatherData(response.data);
      } else {
        setError('City not found');
      }
    } catch (err) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Weather Now</h1>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-primary"
          onClick={fetchWeatherData}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
};

export default WeatherApp;
