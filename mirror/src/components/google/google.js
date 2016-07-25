import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTrends } from '../../actions/action_google'
import Loader from '../loader/loader'

export default class Google extends Component {
  constructor(props) {
    super(props)
    this.props.fetchTrends()
  }

  componentDidMount() {
    const updateTimeInHours = 6
    const updateInterval = updateTimeInHours * 3600000

    setInterval(this.props.fetchTrends, updateInterval)
  }

  renderTrends(trend) {
    if (!trend.data) return

    const googleTrend = trend.data.trend
    const color = googleTrend.hotnessColor // Color google gives to trends based on number of searches, Red is hottest
    const style = { color }

    return (
      <li key={trend.date}>
        <span className="trend_date">{trend.longFormattedDate}</span>
        <span className="trend_text" style={style}>{googleTrend.title}</span>
      </li>
    )
  }

  render() {
    if (!this.props.trends) return <Loader component="trends" />

    const trends = this.props.trends.data.weeksList[4].daysList

    return (
      <ul className="google_trends">
        {trends.map(this.renderTrends)}
      </ul>
    )
  }
}

function mapStateToProps({ trends }) {
  return { trends }
}

export default connect(mapStateToProps, { fetchTrends })(Google)
