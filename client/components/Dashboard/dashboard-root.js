import React from 'react'
import InfoBox from './info-box'
import InfoCardListCount from './info-card-list-count'
import { Grid } from '@material-ui/core'
import Changelog from './changelog'
import Roadmap from './roadmap'

const DashboardRoot = () => {
  return (
    <div>
      <InfoBox
        title="Welcome to your dashboard"
        content={`Things are barebones right now but you can access your gift lists, create new lists, or update existing lists from the sidebar on the left.
        \nMore dashboard updates like stats and gift recommendations are coming soon.`} />

      <Grid container>
        <Grid item xs={6}>
          <Changelog />
        </Grid>
        {/* <Grid item xs={6}>
          <Roadmap />
        </Grid> */}
        {/* <Grid item xs={4}>
          <InfoCardListCount />
        </Grid> */}
      </Grid>
    </div>
  )
}

export default DashboardRoot
