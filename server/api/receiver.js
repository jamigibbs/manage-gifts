const router = require('express').Router()
const { Receiver } = require('../db/models')

const userAuth = function(req, res, next) {
  if (req.body.auth === req.user.email || req.query.auth === req.user.email ) {
    next()
  } else {
    res.status(401).send('Unauthorized user')
  }
}

// POST /api/receiver
router.post('/', userAuth, async (req, res, next) => {
  const { name, listId } = req.body.receiver
  try {
    if (!name || !listId) {
      res.status(400).send('Please enter receiver info')
      next()
    } else {
      const receiver = await Receiver.create({name, listId})
      res.json(receiver)
    }
  } catch (err) { next(err) }
})

// GET /api/receiver/all
router.get('/all/', userAuth, async (req, res, next) => {
  const { listId } = req.query
  try {
    const receivers = await Receiver.findAll({
      where: {
        listId
      }
    })

    receivers.length === 0 ? res.send(null) : res.json(receivers)

  } catch (err) { next(err) }
})

module.exports = router
