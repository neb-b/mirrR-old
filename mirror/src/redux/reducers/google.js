import { FETCH_GOOGLE } from '../constants/constants'

export const GoogleReducer = (state = null, {payload, type}) => {
  switch(type) {
    case FETCH_GOOGLE:
      return payload
    default:
      return state
  }
}
