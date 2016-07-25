import axios from 'axios'

export const FETCH_TRENDS = 'FETCH_TRENDS'

export function fetchTrends() {
  // const url = `https://react-mirror-server.herokuapp.com/google`
  const url = `http://localhost:5000/google`
  const request = axios.get(url)

  return {
    type: FETCH_TRENDS,
    payload: request
  }
}
