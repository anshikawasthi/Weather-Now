export async function fetchWeather(city) {
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  const geoRes = await fetch(geoUrl)
  const geoData = await geoRes.json()

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error('City not found')
  }

  const { latitude, longitude, name, country } = geoData.results[0]

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,cloudcover&daily=sunrise,sunset&timezone=auto`
  const weatherRes = await fetch(weatherUrl)
  const weatherData = await weatherRes.json()

  const now = new Date()
  const hour = now.getHours()
  const timeIndex = weatherData.hourly.time.findIndex(t => new Date(t).getHours() === hour)

  return {
    city: name + ', ' + country,
    current: {
      temperature: weatherData.current_weather.temperature,
      windspeed: weatherData.current_weather.windspeed,
      feels_like: weatherData.hourly.apparent_temperature[timeIndex],
      humidity: weatherData.hourly.relative_humidity_2m[timeIndex],
      precipitation: weatherData.hourly.precipitation[timeIndex],
      cloudcover: weatherData.hourly.cloudcover[timeIndex],
    },
    daily: {
      sunrise: weatherData.daily.sunrise[0].split('T')[1],
      sunset: weatherData.daily.sunset[0].split('T')[1],
    },
  }
}