import { FETCH_COMPONENTS } from '../constants/constants'

export const ComponentReducer = (state = null, {payload, type}) => {
  switch(type) {
    case FETCH_COMPONENTS:
      return payload
    default:
      return state
  }
}
