const Op = require('Sequelize').Op
const passport = require('passport')
const router = require('express').Router()
const TwitterStrategy = require('passport-twitter').Strategy
const {User} = require('../db/models')
const newUserSeed = require('../../script/new-user-seed')
module.exports = router

if (!process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET) {
  console.log('Twitter key / secret not found. Skipping Twitter OAuth.')
} else {
  let userData = null

  const TwitterConfig = {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK
  }

  const strategy = new TwitterStrategy(
    TwitterConfig,
    async(token, tokenSecret, profile, done) => {
      const twitterId = profile.id
      let name = profile.displayName
      const email = profile.emails[0].value

      // if (!name) name = email

      await User.findOrCreate({
        where: { [Op.or]: [{twitterId}, {email}] },
        defaults: {name, email, twitterId}
      })
        .then( async (arr) => {
          // the first element is the user
          const user = arr[0].dataValues
          // the second element tells us if the user was newly created
          const wasCreated = arr[1]
          console.log('user', user)
          userData = user
          
          if (wasCreated) {
            // Seeding with demo content for new users
            await newUserSeed(user)
          } else if (!user.twitterId) {
            // Update user table with googleId if it doesn't already exist
            await User.update({twitterId}, {where: {id: user.id}})
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
