import axios from 'axios'
import { URL, NEWS, FETCH_NEWS } from '../constants/constants'

export function fetchNews() {
  const request = axios.get(`${URL}/${NEWS}`)

  return {
    type: FETCH_NEWS,
    payload: request
  }
}
