import React, { useState } from 'react'

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim() !== '') {
      onSearch(city)
      setCity('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="px-3 py-2 rounded-l border"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-r">
        Search
      </button>
    </form>
  )
}

export default SearchBar