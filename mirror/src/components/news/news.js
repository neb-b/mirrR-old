import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNews } from '../../redux/actions/news'
import Loader from '../loader/loader'

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
