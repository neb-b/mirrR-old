import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTweets } from '../../actions/action_twitter'
import Loader from '../loader/loader'
import stringToDate from './twitter_date'

class Twitter extends Component {
  constructor(props) {
    super(props)
    this.props.fetchTweets()

    this.checkRetweeted = this.checkRetweeted.bind(this)
  }

  componentDidMount() {
    // How often to fetch for t (in minutes)
    let twitterUpdateInterval = 5
    // Convert to milliseconds
    twitterUpdateInterval *= 60000

    setInterval(this.props.fetchTweets, twitterUpdateInterval)
  }

  checkRetweeted(tweet) {
    if (tweet.retweeted_status.text) {
      const user = tweeet.text.split(':')
      return user + tweet.retweeted_status.text
    }
    return tweet.text
  }

  renderCurrentTweets(tweet) {
    // Create tweet with username, screen_name, and time since tweet
    // If tweet contains image(s), show first image
    // Currently showing if tweet is retweeted ("RT:") but not showing the original person who tweeted
    return (
      <li key={tweet.id} className="twitter_tweet">
        <div className="twitter_user">{tweet.user.name}</div>
        <div className="twitter_info">
          <span className="twitter_screen_name">@{tweet.user.screen_name}</span>
          <span className="twitter_time">{stringToDate(tweet.created_at)}</span>
        </div>
        <div>
          <span className="twitter_text">{tweet.retweeted_status ? tweet.retweeted_status.text : 'RT: ' + tweet.text}</span>
          {tweet.extended_entities ? <img className="twitter_img" src={tweet.extended_entities.media[0].media_url} /> : null}
        </div>
      </li>
    )
  }

  render() {
    const tweets = this.props.tweets.data
    if (!tweets) return <Loader component="twitter" />

    return (
      <ul className="twitter">
        {tweets.map(this.renderCurrentTweets)}
      </ul>
    )
  }
}

function mapStateToProps({ tweets }) {
  return { tweets }
}

export default connect(mapStateToProps, { fetchTweets })(Twitter)




// Top current hashtags, not setup on backend
//
//
// renderTwitter(trend) {
//   return (
//     <div className="twitter-trend" key={trend.url}>
//       {trend.name}
//     </div>
//   )
// }
//
// return (
//   <div className="twitter">
//     {
//       trendingData.tweets[0].trends
//         .filter((trend) => trend.name[0] === '#') // Filter out is not a hashtag
//         .slice(0,5)                               // Number of trending topics to see
//         .map(this.renderTwitter)
//     }
//   </div>
// )
