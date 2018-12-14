import './auth-form.scss'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Navbar } from './Header'

import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper, Button, Typography, Divider } from '@material-ui/core'

const styles = theme => ({
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
  const { displayName, error, classes } = props
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
        
        {error && error.response &&
          <Typography
            variant="body2"
            color="error"
            align="center"
          >
            {error.response.data}
          </Typography>
        }

        <Button href="/auth/google" variant="contained" color="primary" fullWidth={true} className={classes.googleButton}>
          {displayName} with Google
        </Button>
        
        <Divider light />
        
        <Button href="/auth/twitter" variant="contained" color="secondary" fullWidth={true} className={classes.googleButton}>
          {displayName} with Twitter
        </Button>

        </Paper>
      </Grid>
    </div>
  )
}

const mapLogin = state => {
  return {
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    displayName: 'Sign Up',
    error: state.user.error
  }
}

export const Login = connect(mapLogin, null)(withStyles(styles)(AuthForm))
export const Signup = connect(mapSignup, null)(withStyles(styles)(AuthForm))

AuthForm.propTypes = {
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object
}
