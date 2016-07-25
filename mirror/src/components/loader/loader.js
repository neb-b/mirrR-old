import React, { Compnent } from 'react'

// A loader that will show a loading message for
// the component that was passed in the props
export default (props) => {
  return (
    <div className={props.component}>
      <p>Loading {props.component}...</p>
    </div>
  )
}
