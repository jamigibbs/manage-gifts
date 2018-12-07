const router = require('express').Router()
const { List, Receiver, Gift, Item } = require('../db/models')

const userAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).send('Unauthorized user')
}

// GET /api/list/all
router.get('/all/', userAuth, async (req, res, next) => {
  const { userId } = req.query
  try {
    const lists = await List.findAll({
      where: {
        userId
      }
    })

    res.json(lists)
  } catch (err) { next(err) }
})

// POST /api/list/add
router.post('/add', userAuth, async (req, res, next) => {
  const { name, userId } = req.body
  try {
    const list = await List.create({ name, userId })
    res.json(list)
  } catch(err) { next(err) }
})

// POST /api/list/name
router.post('/name', async (req, res, next) => {
  const { name, listId } = req.body

  try {
    await List.update({ name },
    {
      where: {id: listId},
      returning: true, // needed for affectedRows to be populated
      plain: true // makes sure that the returned instances are just plain objects
    })

    res.json(name)
  } catch(err) { next(err) }
})

// DELETE /api/list
router.delete('/', userAuth, async (req, res, next) => {
  const { listId, userId } = req.body
  try {
    // remove users - match listId
    await Receiver.destroy({
      where: {
        listId
      }
    })

    // remove list - match Listid & userId
    await List.destroy({
      where: {
        id: listId,
        userId
      }
    })

    const deletedList = {
      listId: parseInt(listId),
      userId
    }

    res.json(deletedList)
  } catch (err) { next(err) }
})

// GET /api/list/gifts
router.get('/gifts', userAuth, async (req, res, next) => {
  const receiverIds = JSON.parse(req.query.receiverIds)
  try {
    const gifts = await Gift.findAll({
      where: {
        receiverId: receiverIds
      }
    })

    res.json(gifts)
  } catch (err) { next(err) }
})

module.exports = router
