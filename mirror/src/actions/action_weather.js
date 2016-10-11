import axios from 'axios'

export const FETCH_WEATHER = 'FETCH_WEATHER'

export function fetchWeather() {
  const url = `http://localhost:5000/weather`
  const request = axios.get(url)

  return {
    type: FETCH_WEATHER,
    payload: request
  }
}
