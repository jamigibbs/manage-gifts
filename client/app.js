import React from 'react'
import { withRouter } from 'react-router-dom'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Routes />
    </div>
  )
}

export default withRouter(App)
