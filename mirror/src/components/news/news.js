import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNews } from '../../actions/action_news'
import Loader from '../loader/loader'

export default class News extends Component {
  constructor(props) {
    super(props)
    this.props.fetchNews()
  }

  componentDidMount() {
    // How often to fetch for news (in minutes)
    let newsUpdateInterval = 15
    // Convert to milliseconds
    newsUpdateInterval *= 60000

    // Fetch news, then setInterval for continuous update
    setInterval(this.props.fetchNews, newsUpdateInterval)
  }

  renderNews(story) {
    return (
      <div key={story.url}>
        <p className="news_title">{story.title}</p>
        <p className="news_abstract">{story.abstract}</p>
      </div>
    )
  }

  render() {
    // Take first 3 stories from NYT and map them into div with title and abstract
    const news = this.props.news.data
    const numberOfStories = 3

    if (!news) return <Loader component="news"/>

    return (
      <div className="news">
        {
          news
            .slice(0, numberOfStories)
            .map(this.renderNews)
          }
      </div>
    )
  }
}

function mapStateToProps({ news }) {
  return { news }
}

export default connect(mapStateToProps, { fetchNews })(News)
