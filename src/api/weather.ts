import type { WeatherApiResponse, WeatherSnapshot } from '../types/weather'

type WeatherData = Omit<WeatherSnapshot, 'cityName' | 'countryCode'>

export async function getWeather(latitude: number, longitude: number): Promise<WeatherData> {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(latitude))
  url.searchParams.set('longitude', String(longitude))
  url.searchParams.set('current', 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,precipitation,weather_code')

  let response: Response

  try {
    response = await fetch(url)
  } catch {
    throw new Error('Não foi possível obter os dados climáticos. Tente novamente.')
  }

  if (!response.ok) {
    throw new Error('Não foi possível obter os dados climáticos. Tente novamente.')
  }

  const data = (await response.json()) as WeatherApiResponse
  const current = data.current

  if (!current) {
    throw new Error('Não foi possível obter os dados climáticos. Tente novamente.')
  }

  return {
    temperature: Number(current.temperature_2m),
    relativeHumidity: Number(current.relative_humidity_2m),
    apparentTemperature: Number(current.apparent_temperature),
    isDay: Number(current.is_day),
    windSpeed: Number(current.wind_speed_10m),
    windDirection: Number(current.wind_direction_10m),
    precipitation: Number(current.precipitation),
    weatherCode: Number(current.weather_code),
  }
}
