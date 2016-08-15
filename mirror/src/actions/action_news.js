import axios from 'axios'

export const FETCH_NEWS = 'FETCH_NEWS'

export function fetchNews() {
  const url = `http://localhost:5000/news`

  const request = axios.get(url)

  return {
    type: FETCH_NEWS,
    payload: request
  }
}
