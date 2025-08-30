import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import { fetchWeather } from './utils/api'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (city) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeather(city)
      setWeatherData(data)
    } catch (err) {
      setError('City not found or API error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-b from-blue-200 to-blue-400">
      <h1 className="text-3xl font-bold mb-4">Weather Now</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  )
}

export default App