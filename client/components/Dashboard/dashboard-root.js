import React from 'react'
import InfoBox from './info-box'
import InfoCardListCount from './info-card-list-count'
import { Grid } from '@material-ui/core'

const DashboardRoot = () => {
  return (
    <div>
      <InfoBox
        title="Welcome to your dashboard"
        content="From here you can view information about your gift lists, create new lists, or update existing lists from the sidebar." />

      <Grid container>
        <Grid item xs={4}>
          <InfoCardListCount />
        </Grid>
        <Grid item xs={4}>
          <InfoCardListCount />
        </Grid>
        <Grid item xs={4}>
          <InfoCardListCount />
        </Grid>
      </Grid>
    </div>
  )
}

export default DashboardRoot
