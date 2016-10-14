import { combineReducers } from 'redux'
import { ComponentReducer } from './components'
import { WeatherReducer } from './weather'
import { NewsReducer } from './news'
import { TwitterReducer } from './twitter'
import { GoogleReducer } from './google'

const rootReducer = combineReducers({
  currentComponents: ComponentReducer,
  weather: WeatherReducer,
  news: NewsReducer,
  tweets: TwitterReducer,
  trends: GoogleReducer
})

export default rootReducer
