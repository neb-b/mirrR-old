import { FETCH_TRENDS } from '../actions/action_google'

export default function (state = null, action) {
  switch(action.type) {
    case FETCH_TRENDS:
      return action.payload
    default:
      return state
  }
}
