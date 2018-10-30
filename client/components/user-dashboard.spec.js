/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserDashboard} from './user-dashboard'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserDashboard', () => {
  let userDashboard

  beforeEach(() => {
    userDashboard = shallow(<UserDashboard email="cody@email.com" />)
  })

  it('renders the email in an h2', () => {
    expect(userDashboard.find('h2').text()).to.be.equal('Welcome, cody@email.com')
  })
})
