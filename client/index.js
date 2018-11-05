import '../styles/main.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { blue } from '@material-ui/core/colors/'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
  },
  typography: {
    useNextVariants: true,
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
