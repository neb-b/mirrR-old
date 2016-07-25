import { combineReducers } from 'redux'
import ComponentReducer from './reducer_components'
import WeatherReducer from './reducer_weather'
import NewsReducer from './reducer_news'
import TwitterReducer from './reducer_twitter'
import GoogleReducer from './reducer_google'

const rootReducer = combineReducers({
  components: ComponentReducer,
  weather: WeatherReducer,
  news: NewsReducer,
  tweets: TwitterReducer,
  trends: GoogleReducer
})

export default rootReducer
