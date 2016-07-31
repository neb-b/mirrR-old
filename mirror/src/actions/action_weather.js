import axios from 'axios'

export const FETCH_WEATHER = 'FETCH_WEATHER'

export function fetchWeather(pos) {
  console.log('pos', pos)
  // const url = `https://react-mirror-server.herokuapp.com/weather`
  const url = `http://localhost:5000/weather`

  const request = axios.get(`${url}/${pos.latitude}/${pos.longitude}`)

  return {
    type: FETCH_WEATHER,
    payload: request
  }
}
