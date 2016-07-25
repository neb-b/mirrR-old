import React from 'react'
import ProgressBar from 'progressbar.js'

export default (props) => {
  const time = props.time

  const minutes = Math.floor(time / 60)
  let seconds = time - minutes * 60

  if (seconds === 0) {
    seconds = seconds.toString() + '0'
  }

  return (
    <div>{`${minutes}:${seconds}`}</div>
  )
}
