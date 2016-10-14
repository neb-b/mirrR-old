import axios from 'axios'
import { URL, COMPONENTS, FETCH_COMPONENTS } from '../constants/constants'

export function fetchComponents() {
  const request = axios.get(`${URL}/${COMPONENTS}`)

  return {
    type: FETCH_COMPONENTS,
    payload: request
  }
}
