import { getCity } from '../api/geocoding'
import { getWeather } from '../api/weather'
import type { WeatherSnapshot } from '../types/weather'

export async function searchWeatherByCity(cityName: string): Promise<WeatherSnapshot> {
  const normalizedName = cityName.trim()

  if (!normalizedName) {
    throw new Error('Digite o nome de uma cidade.')
  }

  const city = await getCity(normalizedName)
  const weather = await getWeather(city.latitude, city.longitude)

  return {
    ...weather,
    cityName: city.name,
    countryCode: city.countryCode,
  }
}
