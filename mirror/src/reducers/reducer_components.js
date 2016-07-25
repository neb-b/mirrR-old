import { FETCH_COMPONENTS } from '../actions/action_components'

export default function (state = null, action) {
  switch(action.type) {
    case FETCH_COMPONENTS:
      return action.payload
    default:
      return state
  }
}
