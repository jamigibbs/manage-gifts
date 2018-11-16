import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { centsToUSD } from '../utilities'
import ReceiverGiftAdd from './receiver-gift-add'
import { Select, FormControl, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core/'

import faker from 'faker'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class ReceiverGiftsList extends Component {
  constructor(props){
    super()
    this.state = {
      gifts: []
    }
  }

  componentDidMount(){
    this.generateGifts(10)
  }

  generateGifts = (count) => {
    const gifts = []

    for(var i = 1; i <= count; i++){
      gifts.push({
        id: i,
        link: faker.internet.url(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        status: 'Not Purchased'
      })
    }

    this.setState({
      gifts
    })
  }

  render(){
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>Price</TableCell>
            <TableCell numeric>Status</TableCell>
            <TableCell numeric><ReceiverGiftAdd /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.gifts.map(gift => {
            return (
              <TableRow key={gift.id}>
                <TableCell component="th" scope="row">
                  <a href={gift.link} target="_blank"  rel="noopener">{gift.name}</a>
                </TableCell>
                <TableCell numeric>{`${centsToUSD(gift.price)}`}</TableCell>
                <TableCell numeric>{gift.status}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    )
  }
}

export default withStyles(styles)(ReceiverGiftsList)
