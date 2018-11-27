/* global describe beforeEach it */

import React from 'react'
import { expect } from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { UserDashboard } from './user-dashboard'
import { ReceiverList, Sidebar } from './Receiver'
import { ListSelect } from './List'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserDashboard', () => {
  let userDashboard
  let classes = {
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: '10px',
    }
  }

  const match = {
    path: 'dashboard/list/1'
  }

  beforeEach(() => {
    const getCurrentListId = () => { return 1 }
    userDashboard = shallow(<UserDashboard
      email="cody@email.com"
      classes={classes}
      getCurrentListId={getCurrentListId}
      currentListId={1}
      match={match} />)
  })

  xit('renders the <ReceiversList /> component', () => {
    expect(userDashboard.find(ReceiverList)).to.have.lengthOf(1)
  })

  xit('renders the <Sidebar /> component', () => {
    expect(userDashboard.find(Sidebar)).to.have.lengthOf(1)
  })

})
