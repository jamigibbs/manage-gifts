/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let michael

      beforeEach(async () => {
        michael = await User.create({
          email: 'michael@scott.com',
          name: 'Michael Scott',
          password: 'worldsgreatestboss'
        })
      })

      it('returns true if the password is correct', () => {
        expect(michael.correctPassword('worldsgreatestboss')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(michael.correctPassword('greatboss')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
