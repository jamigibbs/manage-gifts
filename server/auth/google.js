const Op = require('sequelize').Op
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
    async(token, refreshToken, profile, done) => {
      const googleId = profile.id
      let name = profile.displayName
      const email = profile.emails[0].value

      if (!name) name = email

      const instance = await User.findOrCreate({
        where: { [Op.or]: [{googleId}, {email}] },
        defaults: {name, email, googleId}
      })
        .then( async (arr) => {
          // the first element is the user
          const user = arr[0].dataValues
          // the second element tells us if the user was newly created
          const wasCreated = arr[1]

          userData = user

          if (wasCreated) {
            // Seeding with demo content for new users
            await newUserSeed(user)
          } else if (!user.googleId) {
            // Update user table with googleId if it doesn't already exist
            await User.update({googleId}, {where: {id: user.id}})
          }

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
