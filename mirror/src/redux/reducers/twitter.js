import { FETCH_TWEETS } from '../constants/constants'

export const TwitterReducer = (state = [], {payload, type}) => {
  switch(type) {
    case FETCH_TWEETS:
      return payload
    default:
      return state
  }
}
