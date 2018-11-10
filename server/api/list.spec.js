const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const seed = require('../../script/seed')

const userCredentials = {
  email: 'cody@email.com',
  password: '123'
}

var authenticatedUser = request.agent(app)

describe('Authed route', () => {

  before( async () => {
    await db.sync({force: true})
    //await seed

    await User.create(userCredentials)

    return await authenticatedUser
      .post('/login')
      .send(userCredentials)
      .expect(200)
  })

  after( async () => {
    await User.destroy({where: {email: userCredentials.email }})
  })

  it('GET /api/list/auth', async () => {
    return authenticatedUser
      .get('/api/list/auth')
      .expect(200)
  })
})
