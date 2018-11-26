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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#296AE5'
    },
    background: {
      default: '#F3F4F8'
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: "\"Helvetica Neue\", \"Helvetica\", \"Arial\", sans-serif",
    color: '#686c73'
  },
  shadows: Array(25).fill('none'),
  overrides: {
    MuiPaper: {
      root: {
        borderBottom: '1px solid #e1e5eb',
      },
      rounded: {
        borderRadius: 0
      }
    },
    MuiButton: {
      root: {
        borderRadius: 0,
        textTransform: 'none'
      }
    },
    MuiPrivateNotchedOutline: {
      root: {
        borderRadius: 0,
        top: 0
      }
    },
    MuiOutlinedInput: {
      input: {
        padding: '13.5px 14px'
      }
    },
    MuiTableCell: {
      head: {
        fontWeight: 'bold',
        color: '#30363d',
        fontSize: '0.85rem'
      },
      body: {
        fontSize: '1rem'
      }
    }
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
