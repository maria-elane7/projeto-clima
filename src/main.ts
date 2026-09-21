import './style.css'
import { searchWeatherByCity } from './services/weatherService'
import { formatBrazilianDate, getDayPeriodLabel, getWeatherDescription } from './utils/weatherCode'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Container #app não foi encontrado.')
}

app.innerHTML = `
  <header class="search-panel">
    <div class="search-row">
      <label class="sr-only" for="city-input">Nome da cidade</label>
      <input id="city-input" type="text" placeholder="Digite o nome da cidade" aria-label="Nome da cidade" />
      <button id="search-button" type="button" aria-label="Buscar clima">Buscar</button>
    </div>
  </header>

  <div class="weather-app">
    <div class="weather-layout">
      <aside class="weather-sidebar">
        <div class="sidebar-header">
          <div id="temperature-value" class="temperature">
            <span class="temperature-number">--°C</span>
          </div>
          <div id="city-name" class="city-name">—</div>
          <div id="country-code" class="country-code">—</div>
        </div>

        <div class="meta-list">
          <div class="meta-item"><span>Data</span><strong id="weather-date">—</strong></div>
          <div class="meta-item"><span>Período</span><strong id="weather-day-period">—</strong></div>
          <div class="meta-item"><span>Clima</span><strong id="weather-climate">—</strong></div>
        </div>
      </aside>

      <main class="weather-content">
        <div class="content-card">
          <div class="card-title"><span class="card-icon">💧</span> Umidade</div>
          <div id="weather-humidity" class="card-value">—</div>
        </div>
        <div class="content-card">
          <div class="card-title"><span class="card-icon">🌡️</span> Sensação térmica</div>
          <div id="weather-feels-like" class="card-value">—</div>
        </div>
        <div class="content-card">
          <div class="card-title"><span class="card-icon">🌧️</span> Precipitação</div>
          <div id="weather-precipitation" class="card-value">—</div>
        </div>
        <div class="content-card">
          <div class="card-title"><span class="card-icon">💨</span> Vento</div>
          <div id="weather-wind" class="card-value">—</div>
        </div>
        <div class="content-card">
          <div class="card-title"><span class="card-icon">🧭</span> Direção do vento</div>
          <div id="weather-wind-direction" class="card-value">—</div>
        </div>
      </main>
    </div>

    <div id="status-message" class="status status--idle" role="status" aria-live="polite">
      Pesquise uma cidade para visualizar as condições climáticas.
    </div>
  </div>
`

const cityInput = document.querySelector<HTMLInputElement>('#city-input')!
const searchButton = document.querySelector<HTMLButtonElement>('#search-button')!
const statusMessage = document.querySelector<HTMLDivElement>('#status-message')!
const weatherLayout = document.querySelector<HTMLDivElement>('.weather-layout')!
const temperatureValue = document.querySelector<HTMLDivElement>('#temperature-value')!
const cityNameValue = document.querySelector<HTMLDivElement>('#city-name')!
const countryCodeValue = document.querySelector<HTMLDivElement>('#country-code')!
const weatherDateValue = document.querySelector<HTMLDivElement>('#weather-date')!
const weatherDayPeriodValue = document.querySelector<HTMLDivElement>('#weather-day-period')!
const weatherClimateValue = document.querySelector<HTMLDivElement>('#weather-climate')!
const weatherHumidityValue = document.querySelector<HTMLDivElement>('#weather-humidity')!
const weatherFeelsLikeValue = document.querySelector<HTMLDivElement>('#weather-feels-like')!
const weatherPrecipitationValue = document.querySelector<HTMLDivElement>('#weather-precipitation')!
const weatherWindValue = document.querySelector<HTMLDivElement>('#weather-wind')!
const weatherWindDirectionValue = document.querySelector<HTMLDivElement>('#weather-wind-direction')!

function setStatus(message: string, variant: 'idle' | 'loading' | 'error' | 'success') {
  statusMessage.textContent = message
  statusMessage.className = `status status--${variant}`
  statusMessage.setAttribute('aria-busy', String(variant === 'loading'))
}

function formatReadableTemperature(value: number): string {
  return `${Math.round(value)}°C`
}

function formatReadablePrecipitation(value: number): string {
  return `${Number(value.toFixed(1))} mm`
}

function formatReadableWind(value: number): string {
  return `${Math.round(value)} km/h`
}

function getWeatherIcon(code: number): string {
  if (code === 0 || code === 1 || code === 2) return '☀️'
  if (code === 3 || code === 45 || code === 48) return '🌫️'
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return '🌧️'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️'
  if ([95, 96, 99].includes(code)) return '⛈️'
  return '🌤️'
}

function hideWeatherView() {
  weatherLayout.classList.remove('is-visible')
}

function showWeatherView() {
  weatherLayout.classList.add('is-visible')
}

function resetWeatherView() {
  hideWeatherView()
  temperatureValue.innerHTML = `
    <span class="temperature-number">--°C</span>
  `
  cityNameValue.textContent = '—'
  countryCodeValue.textContent = '—'
  weatherDateValue.textContent = '—'
  weatherDayPeriodValue.textContent = '—'
  weatherClimateValue.textContent = '—'
  weatherHumidityValue.textContent = '—'
  weatherFeelsLikeValue.textContent = '—'
  weatherPrecipitationValue.textContent = '—'
  weatherWindValue.textContent = '—'
  weatherWindDirectionValue.textContent = '—'
}

function renderWeatherResult(weather: Awaited<ReturnType<typeof searchWeatherByCity>>) {
  temperatureValue.innerHTML = `
    <span class="temperature-number">${formatReadableTemperature(weather.temperature)}</span>
  `
  cityNameValue.textContent = weather.cityName
  countryCodeValue.textContent = weather.countryCode
  weatherDateValue.textContent = formatBrazilianDate(new Date())
  weatherDayPeriodValue.textContent = `${getDayPeriodLabel(weather.isDay) === 'Dia' ? '☀️ Dia' : '🌙 Noite'}`
  weatherClimateValue.textContent = `${getWeatherIcon(weather.weatherCode)} ${getWeatherDescription(weather.weatherCode)}`
  weatherHumidityValue.textContent = `${Math.round(weather.relativeHumidity)}%`
  weatherFeelsLikeValue.textContent = formatReadableTemperature(weather.apparentTemperature)
  weatherPrecipitationValue.textContent = formatReadablePrecipitation(weather.precipitation)
  weatherWindValue.textContent = formatReadableWind(weather.windSpeed)
  weatherWindDirectionValue.textContent = `${Math.round(weather.windDirection)}°`
}

async function handleSearch() {
  const cityName = cityInput.value.trim()

  if (!cityName) {
    resetWeatherView()
    setStatus('Digite o nome de uma cidade.', 'error')
    cityInput.focus()
    return
  }

  resetWeatherView()
  setStatus('Carregando informações climáticas...', 'loading')
  searchButton.disabled = true
  cityInput.disabled = true

  try {
    const weather = await searchWeatherByCity(cityName)
    renderWeatherResult(weather)
    showWeatherView()
    setStatus(`Clima em ${weather.cityName}: ${weather.temperature}°C e ${weather.relativeHumidity}% de umidade.`, 'success')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Não foi possível obter os dados climáticas. Tente novamente.'

    resetWeatherView()

    if (message === 'Cidade não encontrada.') {
      setStatus('Cidade não encontrada.', 'error')
    } else {
      setStatus('Não foi possível obter os dados climáticos. Tente novamente.', 'error')
    }
  } finally {
    searchButton.disabled = false
    cityInput.disabled = false
    cityInput.focus()
  }
}

searchButton.addEventListener('click', handleSearch)
cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    handleSearch()
  }
})
