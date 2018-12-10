const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
const newUserSeed = require('../../script/new-user-seed')
module.exports = router

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  let userData = null
  
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }

  const strategy = new GoogleStrategy(
    googleConfig,
    (token, refreshToken, profile, done) => {
      const googleId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value

      User.findOrCreate({
        where: {googleId},
        defaults: {name, email}
      })
        .then( async (arr) => {
          // the first element is the user
          const user = arr[0].dataValues
          // the second element tells us if the user was newly created
          const wasCreated = arr[1]
          userData = user
          // Seeding with demo content for new users
          if (wasCreated) { await newUserSeed(user) }
          done(null, user)
        })
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/',
    passport.authenticate('google', {scope: ['email']}))

  router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res, next) {
      res.cookie('mg_iLI', true)
      res.cookie('mg_id', userData.id)
      res.redirect('/dashboard')
    })
}
