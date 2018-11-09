const router = require('express').Router()
const { List } = require('../db/models')

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

module.exports = router
