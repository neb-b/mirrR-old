import axios from 'axios'
import { URL, GOOGLE, FETCH_GOOGLE } from '../constants/constants'

export function fetchGoogle() {
  const request = axios.get(`${URL}/${GOOGLE}`)

  return {
    type: FETCH_GOOGLE,
    payload: request
  }
}
