import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Grid, Card, CardMedia } from '@material-ui/core'
import { Navbar } from '../Header'
import Footer from '../footer'

const styles = theme => ({
  cta: {
    maxWidth: '600px',
    margin: '100px 0'
  },
  header: {
    lineHeight: '1.4',
    fontWeight: 'bold'
  },
  eyebrow: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  card: {
    maxWidth: 1000,
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    marginBottom: '50px'
  }
})

const Home = ({classes}) => (
  <div>
    <Navbar />
    <Grid container className="footer-push">
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

        <Grid container justify="center">
          <Grid item>
            <Card className={classes.card}>
              <CardMedia
                component="img"
                className={classes.media}
                image="/img/gifts-list.png"
                title="Gifts list"
              />
            </Card>
          </Grid>
        </Grid>

      </Grid>
    </Grid>

    <Footer />
  </div>
)

export default withStyles(styles)(Home)
