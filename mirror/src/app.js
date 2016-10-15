import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchComponents } from './redux/actions/components'
import { URL } from './redux/constants/constants'
import Loader from './components/internal/loader'
import io from 'socket.io-client'

// Import mirror components
import Greeting from './components/greeting/greeting' // Small greeting
import Time from './components/time/time'             // Clock with date
import Weather from './components/weather/weather'    // Current temperature and summary
import News from './components/news/news'             // Top headlines from NYT
import TwitterFeed from './components/twitter/twitter'    // Current twitter timeline
import Google from './components/google/google'       // Current Google trends

const availableComponents = {
  Greeting,
  Time,
  Weather,
  News,
  TwitterFeed,
  Google,
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { currentComponents: null }
    this.renderComponents = this.renderComponents.bind(this)

    const socket = io(URL)

    socket.on('update-components', (currentComponents) => {
      this.setState({ currentComponents })
    })
  }

  componentDidMount() {
    this.props.fetchComponents()
  }

  componentWillReceiveProps({ currentComponents: { data }}) {
    this.setState({
      currentComponents: data
    })
  }

  renderComponents(component) {
    if (component.active) {
      const NewComp = availableComponents[component.name]
      return <NewComp key={component.name} {...component}/>
    }
    return null
  }

  render() {
    return (
      <div>
        {
          this.state.currentComponents
            ? this.state.currentComponents.map(this.renderComponents)
            : <Loader component="app" />
        }
      </div>
    )
  }
}

function mapStateToProps({ currentComponents }) {
  return { currentComponents  }
}

export default connect(mapStateToProps, { fetchComponents })(App)
