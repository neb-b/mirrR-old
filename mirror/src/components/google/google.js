import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGoogle } from '../../redux/actions/google'
import Loader from '../internal/loader'


class Google extends Component {
  constructor(props) {
    super(props)

    this.googleUpdate = null
  }

  componentDidMount() {
    this.props.fetchGoogle()

    const updateTimeInHours = 3
    const updateInterval = 3600000 * updateTimeInHours

    this.googleUpdate = setInterval(this.props.fetchGoogle, updateInterval)
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
    const trends = this.props.trends && this.props.trends.data.weeksList[4].daysList

    return (
      <ul className="google_trends">
        {
          this.props.trends
          ? trends
            .filter((trend) => trend.data)
            .map(this.renderTrends)
          : <Loader component="trends" style="google_trends" />
        }
      </ul>
    )
  }
}

function mapStateToProps({ trends }) {
  return { trends }
}

export default connect(mapStateToProps, { fetchGoogle })(Google)
