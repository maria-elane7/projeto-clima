import type { GeocodingApiResponse, CityLocation } from '../types/weather'

export async function getCity(cityName: string): Promise<CityLocation> {
  const normalizedName = cityName.trim()

  if (!normalizedName) {
    throw new Error('Digite o nome de uma cidade.')
  }

  const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
  url.searchParams.set('name', normalizedName)
  url.searchParams.set('count', '1')
  url.searchParams.set('language', 'pt')
  url.searchParams.set('format', 'json')
  url.searchParams.set('countryCode', 'BR')

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Não foi possível obter os dados climáticos. Tente novamente.')
  }

  const data = (await response.json()) as GeocodingApiResponse
  const result = data.results?.[0]

  if (!result) {
    throw new Error('Cidade não encontrada.')
  }

  return {
    name: result.name,
    countryCode: result.country_code ?? 'BR',
    latitude: Number(result.latitude),
    longitude: Number(result.longitude),
  }
}
