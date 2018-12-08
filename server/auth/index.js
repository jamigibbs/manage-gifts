const router = require('express').Router()
const { User, List, Item, Gift, Receiver } = require('../db/models')
const newUserSeed = require('../../script/new-user-seed')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, (err) => {
        if (err) { next(err) }
        res.cookie('mg_iLI', true)
        res.cookie('mg_id', user.id)
        res.json(user)
      })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)

    await newUserSeed(user)

    req.login(user, (err) => {
      if (err) { next(err) }

      res.cookie('mg_iLI', true)
      res.cookie('mg_id', user.id)
      res.json(user)
    })
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  res.clearCookie('mg_iLI')
  res.clearCookie('mg_id')
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
