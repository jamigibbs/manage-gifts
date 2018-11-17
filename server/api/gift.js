const router = require('express').Router()
const { Item, Gift } = require('../db/models')
const metadata = require('../../script/metadata')
const { isDomain, removeLinkParams } = require('../../client/utilities')

const userAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(401).send('Unauthorized user')
}

// GET /api/gift/add
router.post('/add', userAuth, async (req, res, next) => {
  let url = decodeURIComponent(req.body.url)
  const receiverId = req.body.receiverId
  let addedGift = {}
  let data = {}

  try {
    if ( isDomain(url, 'amazon.com') ) {
      url = removeLinkParams(url)
    }

    // check if url exists already in db
    const foundItem = await Item.findOne({
      where: { url }
    })

    if (foundItem) {
      // update the gifts table with item id
      addedGift = await Gift.create({
        status: 'Pending',
        itemId: foundItem.id,
        receiverId
      })

      // send back correctly formed data
      data = addedGift.dataValues
      data.item = foundItem.dataValues

    } else {
      const giftMetaData = await metadata(url)
      const item = await Item.create({
        url,
        image: giftMetaData.image,
        name: giftMetaData.title
      })

      // update the gifts table with item id
      addedGift = await Gift.create({
        status: 'Pending',
        itemId: item.id,
        receiverId
      })

      // send back correctly formed data
      data = addedGift.dataValues
      data.item = item.dataValues
    }

    res.json(data)
  } catch (err) { next(err) }
})

module.exports = router
