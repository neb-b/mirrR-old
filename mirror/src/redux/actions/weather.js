import axios from 'axios'
import { URL, WEATHER, FETCH_WEATHER } from '../constants/constants'

export function fetchWeather() {
  const request = axios.get(`${URL}/${WEATHER}`)

  return {
    type: FETCH_WEATHER,
    payload: request
  }
}
