import { FETCH_NEWS } from '../constants/constants'

export const NewsReducer = (state = [], {payload, type}) => {
  switch(type) {
    case FETCH_NEWS:
      return payload
    default:
      return state
  }
}
