import React from 'react'
import { withRouter } from 'react-router-dom'

import { Navbar } from './components'
import Routes from './routes'

const App = ({match}) => {
  return (
    <div>
      <Routes />
    </div>
  )
}

export default withRouter(App)
