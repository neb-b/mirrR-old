import axios from 'axios'

export const FETCH_NEWS = 'FETCH_NEWS'

export function fetchNews() {
  // const url = 'https://react-mirror-server.herokuapp.com/news'
  const url = `http://localhost:5000/news`

  const request = axios.get(url)

  return {
    type: FETCH_NEWS,
    payload: request
  }
}
