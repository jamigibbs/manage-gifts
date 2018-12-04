import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'
import { Navbar } from '../Header'

const styles = theme => ({
  cta: {
    maxWidth: '600px',
    marginTop: '100px'
  },
  header: {
    lineHeight: '1.4',
    fontWeight: 'bold'
  },
  eyebrow: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '10px',
  }
})

const Home = ({classes}) => (
  <div>
    <Navbar />
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item>
          <div className={classes.cta} >
            <Typography 
              variant="body2"
              align="center"
              className={classes.eyebrow}>
              For it is in giving that we receive
            </Typography>
            <Typography 
              variant="h4" 
              component="h2" 
              align="center"
              className={classes.header}>
              Organize your gifts for holidays, events, or just in the spirit of giving
            </Typography>
          </div>
          </Grid>
        </Grid>      
      </Grid>
    </Grid>
  </div>
)

export default withStyles(styles)(Home)
