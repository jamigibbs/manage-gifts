const router = require('express').Router()

router.use('/google', require('./google'))
router.use('/twitter', require('./twitter'))

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

module.exports = router
