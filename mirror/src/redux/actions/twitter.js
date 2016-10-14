import axios from 'axios'
import { URL, FETCH_TWEETS, TWITTER } from '../constants/constants'

export function fetchTweets() {
  const request = axios.get(`${URL}/${TWITTER}`)

  return {
    type: FETCH_TWEETS,
    payload: request
  }
}
