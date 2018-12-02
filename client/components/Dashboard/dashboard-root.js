import React from 'react'
import InfoBox from './info-box'

const DashboardRoot = () => {
  return (
    <div>
      <InfoBox
        title="Welcome to your dashboard"
        content="From here you can view information about your gift lists, create new lists, or update existing lists from the sidebar." />
    </div>
  )
}

export default DashboardRoot
