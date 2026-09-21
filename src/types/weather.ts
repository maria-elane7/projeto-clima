export interface GeocodingResult {
  name: string
  country_code?: string
  latitude: number
  longitude: number
}

export interface GeocodingApiResponse {
  results?: GeocodingResult[]
}

export interface CurrentWeatherResponse {
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  is_day: number
  wind_speed_10m: number
  wind_direction_10m: number
  precipitation: number
  weather_code: number
}

export interface WeatherApiResponse {
  current?: CurrentWeatherResponse
}

export interface CityLocation {
  name: string
  countryCode: string
  latitude: number
  longitude: number
}

export interface WeatherSnapshot {
  cityName: string
  countryCode: string
  temperature: number
  relativeHumidity: number
  apparentTemperature: number
  isDay: number
  windSpeed: number
  windDirection: number
  precipitation: number
  weatherCode: number
}
