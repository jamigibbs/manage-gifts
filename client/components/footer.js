import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

const styles = theme => ({
  footer: {
    width: '100%',
    padding: '0 20px',
    backgroundColor: 'white'
  },
  links: {
    listStyleType: 'none',
    textAlign: 'right'
  },
  listItem: {
    display: 'inline-block',
    marginRight: '15px'
  }
})

const footerLinks = [
  {id: 0, href: "https://github.com/jamigibbs/gift-manager", target: "_blank", rel: "noopener", text: "Github", helperClass: ""},
  {id: 1, href: "mailto:jami0821@gmail.com?subject=Message about Manage Gifts", target: "", rel: "", text: "Contact", helperClass: ""},
  {id: 2, href: "https://twitter.com/intent/tweet?text=I'm managing my gift giving like a boss!&url=http://managegifts.com&related=jamigibbs", target: "_blank", rel: "noopener", text: "Tweet share", helperClass: 'twitter-button'}
]

const Footer = ({classes}) => {
  return (
    <footer className={classes.footer}>
      <Grid container>
        <Grid item xs={12} className="vertical-center">
          <ul className={classes.links}>
            {footerLinks.map((link) => {
              return (
              <li key={link.id} className={classes.listItem}>
                <a href={link.href} target={link.target} rel={link.rel} className={link.helperClass} >
                  <Typography variant="body2">{link.text}</Typography>
                </a>
              </li>
              )
            })}
          </ul>
        </Grid>
      </Grid>
    </footer>
  )
}

export default withStyles(styles)(Footer)
