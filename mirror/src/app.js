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
import Music from './components/music/music'         // Play music with your voice
import Google from './components/google/google'       // Current Google trends
// import Calendar from './components/calendar/calendar' // Basic Calendar

const availableComponents = {
  Greeting,
  Time,
  Weather,
  News,
  Twitter,
  Music,
  Google,
  // Calendar
}

// Fetch current components to be used from Node server
// Receive list of components that will be used in this.props.components
// Map over list and return the actual component from availableComponents
// If new list of components emitted from socket, setState and re-render
class App extends Component {
  constructor(props) {
    super(props)

    this.state = { components: null }
    this.props.fetchComponents()
    this.renderComponents = this.renderComponents.bind(this)

    const url = 'http://localhost:5000'
    const socket = io(url)

    socket.on('update-components', (data) => {
      console.log('data', data)
      this.setState({ currentComponents: data.components })
    })
  }


  // Function that takes the name of a component and returns the actual component
  // Creates NewComp from availableComponents
  renderComponents(component) {
    if (component.active) {
      const NewComp = availableComponents[component.name]
      return <NewComp key={component.name}/>
    }
    return null
  }

  // Render loads components from props first
  render() {
    const components = this.props.components
    if (!components) return <Loader component="app" />
    return (
      <div>
        {components ? components.data.map(this.renderComponents) : this.state.currentComponents(this.renderComponents)}
      </div>
    )
  }
}

function mapStateToProps({ components }) {
  return { components }
}

export default connect(mapStateToProps, { fetchComponents })(App)
