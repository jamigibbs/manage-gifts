const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/receiver', require('./receiver'))
router.use('/list', require('./list'))
router.use('/gift', require('./gift'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
