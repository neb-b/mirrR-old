import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTrends } from '../../actions/action_google'
import Loader from '../loader/loader'


export default class Google extends Component {
  constructor(props) {
    super(props)

    this.googleUpdate = null
  }

  componentDidMount() {
    this.props.fetchTrends()

    const updateTimeInHours = 3
    const updateInterval = 3600000 * updateTimeInHours

    this.googleUpdate = setInterval(this.props.fetchTrends, updateInterval)
  }

  componentWillUnmount() {
    if (this.googleUpdate) clearInterval(this.googleUpdate)
  }

  renderTrends(trend, ) {
    const { title, hotnessColor } = trend.data.trend
    const style = { color: hotnessColor }

    return (
      <li key={trend.date}>
        <span className="trend_date">{trend.longFormattedDate}</span>
        <span className="trend_text" style={style}>{title}</span>
      </li>
    )
  }

  render() {
    if (!this.props.trends) return <Loader component="trends" />

    const trends = this.props.trends.data.weeksList[4].daysList


    return (
      <ul className="google_trends">
        {
          trends
            .filter((trend) => trend.data)
            .map(this.renderTrends)
        }
      </ul>
    )
  }
}

function mapStateToProps({ trends }) {
  return { trends }
}

export default connect(mapStateToProps, { fetchTrends })(Google)
