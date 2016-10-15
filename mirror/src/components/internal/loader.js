import React, { Compnent } from 'react'

// A loader that will show a loading message for
// the component that was passed in the props
export default ({component, style}) => {
  return (
    <div className={`${component} ${style}`}>
      <p>Loading {component}...</p>
    </div>
  )
}
