import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchComponents } from './actions/action_components'
import Loader from './components/loader/loader'
import io from 'socket.io-client'

// Import mirror components
import Greeting from './components/greeting/greeting' // Small greeting
import Time from './components/time/time'             // Clock with date
import Weather from './components/weather/weather'    // Current temperature and 5 day forecast
import News from './components/news/news'             // Top headlines from NYT
import Twitter from './components/twitter/twitter'    // Current twitter timeline
import Google from './components/google/google'       // Current Google trends

const availableComponents = {
  Greeting,
  Time,
  Weather,
  News,
  Twitter,
  Google,
}

// Fetch current components to be used from Node server
// Receive list of components that will be used in this.props.components
// Map over list and return the actual component from availableComponents
// If new list of components emitted from socket, setState and re-render
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { currentComponents: null }
    this.renderComponents = this.renderComponents.bind(this)

    const url = 'http://localhost:5000'
    const socket = io(url)

    socket.on('update-components', (currentComponents) => {
      this.setState({ currentComponents })
    })
  }

  componentDidMount() {
    this.props.fetchComponents()
  }

  componentWillReceiveProps(response) {
    this.setState({
      currentComponents: response.currentComponents.data
    })
  }

  // Function that takes the name of a component and returns the actual component
  // Creates NewComp from availableComponents
  renderComponents(component) {
    if (component.active) {
      const NewComp = availableComponents[component.name]
      return <NewComp key={component.name} {...component}/>
    }
    return null
  }

  // Render loads components from props first
  render() {
    const components = this.state.currentComponents
    if (!components) return <Loader component="app" />

    return (
      <div>
        {this.state.currentComponents.map(this.renderComponents)}
      </div>
    )
  }
}

function mapStateToProps({ currentComponents }) {
  return { currentComponents }
}

export default connect(mapStateToProps, { fetchComponents })(App)
