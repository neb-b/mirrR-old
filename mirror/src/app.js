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
import Mic from './components/speech/mic'             // Search with voice
import Google from './components/google/google'       // Current Google trends
import Calendar from './components/calendar/calendar' // Basic Calendar

const availableComponents = {
  Greeting,
  Time,
  Weather,
  News,
  Twitter,
  Mic,
  Google,
  Calendar
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
    this.createComponent = this.createComponent.bind(this)

    var socket = io('http://localhost:5000')
    socket.on('update-components', (data) => {
      this.setState({ components: data.components })
    })
  }


  // Function that takes the name of a component and returns the actual component
  // Creates NewComp from availableComponents
  createComponent(componentName) {
    const NewComp = availableComponents[componentName]
    return <NewComp key={componentName}/>
  }

  // If no components, return a message
  // If one component call createComponent
  // If several components, map over and call createComponent for each string
  renderComponents(components) {
    if (!components) return <h1>No components loaded</h1>

    // If only one component is loaded from the server it is sent as a string
    // Shouldn't have to do this once request comes from a phone
    if (typeof components === 'string') {
      return this.createComponent(components)
    }

    return components.map(this.createComponent)
  }

  // Render loads components from props first
  render() {
    const components = this.props.components
    if (!components) return <Loader component="app" />

    return (
      <div>
        {this.state.components ? this.renderComponents(this.state.components) : this.renderComponents(components.data.components)}
      </div>
    )
  }
}

function mapStateToProps({ components }) {
  return { components }
}

export default connect(mapStateToProps, { fetchComponents })(App)
