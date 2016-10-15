import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNews } from '../../redux/actions/news'
import Loader from '../internal/loader'

class News extends Component {
  constructor(props) {
    super(props)
    this.props.fetchNews()

    this.newsUpdate = null
  }

  componentDidMount() {
    const updateTimeInMinutes = 15
    const newsUpdateInterval = 60000 * updateTimeInMinutes

    this.newsUpdate = setInterval(this.props.fetchNews, newsUpdateInterval)
  }

  componentWillUnmount() {
    if (this.newsUpdate) clearInterval(this.newsUpdate)
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
    const news = this.props.news
    const numberOfStories = 3

    return (
      <div className="news">
        {
          news.data
          ? news.data
            .slice(0, numberOfStories)
            .map(this.renderNews)
          : <Loader component="news"/>
        }
      </div>
    )
  }
}

function mapStateToProps({ news }) {
  return { news }
}

export default connect(mapStateToProps, { fetchNews })(News)
