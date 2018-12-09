import './auth-form.scss'
import { createLoadingSelector } from '../utilities'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../actions'
import { Navbar } from './Header'

import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper, TextField, Button, Typography, Divider } from '@material-ui/core'

const styles = theme => ({
  submitButton: {
    marginTop: '40px',
    marginBottom: '20px'
  },
  googleButton: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  title: {
    margin: '20px 0',
    fontWeight: 'bold'
  }
})

const AuthForm = props => {
  const { name, displayName, handleSubmit, error, classes } = props
  return (
    <div>
      <Navbar />

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >

        <Typography
          variant="h5"
          color="default"
          align="center"
          className={classes.title}
        >
          {displayName}
        </Typography>

        <Paper elevation={1} square={true} className="auth-form">

        <form className="auth-form__form" onSubmit={handleSubmit} name={name}>

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >

          { name === 'signup' &&
            <TextField
              id="outlined-name-input"
              label="Name"
              type="text"
              name="userName"
              autoComplete="give-name"
              margin="normal"
              required={true}
              fullWidth={true}
              variant="outlined"
            />
          }

          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="family-name"
            margin="normal"
            required={true}
            fullWidth={true}
            variant="outlined"
          />

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            name="password"
            margin="normal"
            required={true}
            fullWidth={true}
            variant="outlined"
          />
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            fullWidth={true}
            className={classes.submitButton}
          >
            {displayName}
          </Button>

          {error && error.response &&
            <Typography
              variant="body2"
              color="error"
              align="center"
            >
              {error.response.data}
            </Typography>
          }

          </Grid>

        </form>

        <Divider light />

        {/* <a href="/auth/google">{displayName} with Google</a> */}

        <Button disabled href="/auth/google" variant="contained" color="primary" fullWidth={true} className={classes.googleButton}>
          {displayName} with Google
        </Button>

        </Paper>
      </Grid>
    </div>
  )
}

const loadingSelector = createLoadingSelector(['GET_USER'])

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    isFetching: loadingSelector(state)
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    isFetching: loadingSelector(state)
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const name = evt.target.userName.value
        dispatch(auth(email, password, formName, name))
      } else {
        dispatch(auth(email, password, formName, null))
      }

    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(withStyles(styles)(AuthForm))
export const Signup = connect(mapSignup, mapDispatch)(withStyles(styles)(AuthForm))

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object
}
