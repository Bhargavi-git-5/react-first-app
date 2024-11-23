import React from 'react';

const WeatherCard = ({ data }) => {
  const { current_weather } = data;
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Current Weather</h5>
        <p className="card-text">
          <strong>Temperature:</strong> {current_weather.temperature}°C
        </p>
        <p className="card-text">
          <strong>Wind Speed:</strong> {current_weather.wind_speed} km/h
        </p>
        <p className="card-text">
          <strong>Humidity:</strong> {current_weather.humidity}%
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
