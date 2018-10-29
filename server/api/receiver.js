const router = require('express').Router()
const { Receiver } = require('../db/models')

const userAuth = function(req, res, next) {
  return req.body.auth === req.user.email ? next() : res.status(401).send('Unauthorized user')
}

// POST /api/receiver
router.post('/', userAuth, async (req, res, next) => {
  const { name, listId } = req.body.receiver
  try {
    const receiver = await Receiver.create({name, listId})
    res.json(receiver)
  } catch (err) {
    next(err)
  }
})

module.exports = router
