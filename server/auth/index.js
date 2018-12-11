const router = require('express').Router()
const { User, Reset } = require('../db/models')
const newUserSeed = require('../../script/new-user-seed')
const { randomString } = require('../../client/utilities')
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

router.post('/forgotpass', async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).json({message: 'No request body'})
    if (!req.body.email) return res.status(400).json({message: 'No email is request body'})
    
    const token = randomString(40)
    
    // get user id
    const user = await User.findOne({where: {email: req.body.email}})
    
    // add token to user's reset row
    await Reset.findOrCreate({ where: {userId: user.id}, defaults: {token}})
      .then(arr => {
        const instance = arr[0] // the first element is the instance
        const wasCreated = arr[1] // the second element tells us if the instance was newly created
        // if exists, update token
        if (!wasCreated) {
          return Reset.update({token}, {where: {userId: user.id}})
        }
      })
    
    // Send reset email to user
    const resetEmailData = {
      to: req.body.email,
      subject: 'Manage Gifts Password Reset',
      html: `Someone has requested to reset the password for an account with this email address. 
      If this wasn't you, you can ignore this email. Otherwise, please use the following link for 
      instructions to reset your password: ${req.headers.host}/auth/resetpass/${token}`
    }
    
    res.send(token)
  } catch (err) {
    next(err)
  }
})

router.post('/resetpass/:token', async (req, res, next) => {
  
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
