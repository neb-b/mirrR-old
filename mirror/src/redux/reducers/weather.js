import { FETCH_WEATHER } from '../constants/constants'

export const WeatherReducer = (state = {}, {payload, type}) => {
  switch(type) {
    case FETCH_WEATHER:
      return payload
    default:
      return state
  }
}
