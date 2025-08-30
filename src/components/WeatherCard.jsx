import React from 'react'

function WeatherCard({ data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-sm mt-4">
      <h2 className="text-2xl font-semibold mb-2">{data.city}</h2>
      <p className="text-lg">{data.current.temperature}°C (feels like {data.current.feels_like}°C)</p>
      <p>Humidity: {data.current.humidity}%</p>
      <p>Wind Speed: {data.current.windspeed} km/h</p>
      <p>Precipitation: {data.current.precipitation} mm</p>
      <p>Cloud Cover: {data.current.cloudcover}%</p>
      <p>Sunrise: {data.daily.sunrise}</p>
      <p>Sunset: {data.daily.sunset}</p>
    </div>
  )
}

export default WeatherCard