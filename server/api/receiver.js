const router = require('express').Router()
const { Receiver, Gift, Item } = require('../db/models')

const userAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).send('Unauthorized user')
}

// POST /api/receiver
router.post('/', userAuth, async (req, res, next) => {
  const { name, listId } = req.body
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

    receivers.length === 0 ? res.send([]) : res.json(receivers)

  } catch (err) { next(err) }
})

// DELETE /api/receiver
router.delete('/', userAuth, async (req, res, next) => {
  const { listId, receiverId } = req.body
  try {
    await Receiver.destroy({
      where: {
        listId,
        id: receiverId
      }
    })
    res.json({ listId, receiverId })
  } catch (err) { next(err) }
})

// GET /api/receiver/gifts
router.get('/gifts/', userAuth, async (req, res, next) => {
  const { receiverId } = req.query
  try {
    const gifts = await Gift.findAll({
      where: {
        receiverId
      },
      include: [{model: Item}]
    })

    res.json(gifts)
  } catch (err) { next(err) }
})

// GET /api/receiver/
router.get('/', userAuth, async (req, res, next) => {
  const { receiverId } = req.query
  try {
    const receiver = await Receiver.findById(receiverId)
    res.json(receiver)
  } catch (err) { next(err) }
})

// DELETE /api/receiver
router.delete('/gift', userAuth, async (req, res, next) => {
  const { id } = req.body
  try {
    const gift = await Gift.destroy({
      where: { id }
    })
    res.json(gift)
  } catch (err) { next(err) }
})

// POST /api/receiver/gift/status
router.post('/gift/status', userAuth, async (req, res, next) => {
  let { id, purchased } = req.body.gift
  //Toggle boolean
  purchased = !purchased
  try {
    await Gift.update({ purchased }, { where: { id } })
    res.json(req.body.gift)
  } catch (err) { next(err) }
})

module.exports = router
