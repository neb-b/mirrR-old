import axios from 'axios'

export const FETCH_WEATHER = 'FETCH_WEATHER'

export function fetchWeather(pos) {
  const url = `http://localhost:5000/weather`

  const request = axios.get(`${url}/${pos.lat}/${pos.lon}`)

  return {
    type: FETCH_WEATHER,
    payload: request
  }
}
