import { FETCH_NEWS } from '../actions/action_news'

export default function (state = [], action) {
  switch(action.type) {
    case FETCH_NEWS:
      return action.payload
    default:
      return state
  }
}
