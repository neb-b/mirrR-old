import { FETCH_TWEETS } from '../actions/action_twitter'

export default function (state = [], action) {
  switch(action.type) {
    case FETCH_TWEETS:
      return action.payload
    default:
      return state
  }
}
