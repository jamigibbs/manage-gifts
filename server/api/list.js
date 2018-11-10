const router = require('express').Router()
const { List } = require('../db/models')

const userAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).send('Unauthorized user')
}

// GET /api/list/auth
router.get('/auth/', userAuth, (req, res, next) => {
  try {
    res.status(200)
  } catch(err) { next(err) }
})

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
router.post('/add', userAuth, async(req, res, next) => {
  const { name, userId } = req.body
  try {
    const list = await List.create({ name, userId })

    res.json(list)
  } catch(err) { next(err) }
})

module.exports = router
