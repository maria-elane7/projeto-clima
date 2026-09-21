export function getWeatherDescription(code: number): string {
  const map: Record<number, string> = {
    0: 'Céu limpo',
    1: 'Parcialmente nublado',
    2: 'Parcialmente nublado',
    3: 'Encoberto',
    45: 'Neblina',
    48: 'Neblina com gelo',
    51: 'Garoa leve',
    53: 'Garoa',
    55: 'Garoa forte',
    56: 'Garoa gelada leve',
    57: 'Garoa gelada forte',
    61: 'Chuva leve',
    63: 'Chuva',
    65: 'Chuva forte',
    66: 'Chuva gelada leve',
    67: 'Chuva gelada forte',
    71: 'Neve leve',
    73: 'Neve',
    75: 'Neve forte',
    77: 'Granizo',
    80: 'Pancadas leves',
    81: 'Pancadas',
    82: 'Pancadas fortes',
    85: 'Neve leve',
    86: 'Neve forte',
    95: 'Trovoada',
    96: 'Trovoada com granizo',
    99: 'Trovoada com granizo forte',
  }

  return map[code] ?? 'Condição climática'
}

export function formatBrazilianDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function getDayPeriodLabel(isDay: number): string {
  return isDay === 1 ? 'Dia' : 'Noite'
}
