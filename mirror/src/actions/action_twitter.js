import axios from 'axios'

export const FETCH_TWEETS = 'FETCH_TWEETS'

export function fetchTweets() {
  // const url = 'https://react-mirror-server.herokuapp.com/twitter'
  const url = `http://localhost:5000/twitter`

  const request = axios.get(url)

  return {
    type: FETCH_TWEETS,
    payload: request
  }
}
