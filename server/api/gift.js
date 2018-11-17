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
router.post('/add', async (req, res, next) => {
  let url = decodeURIComponent(req.query.url)
  const receiverId = req.query.receiverId
  let addedGift = {}

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
      await Gift.create({
        status: 'Pending',
        itemId: foundItem.id,
        receiverId
      })

      res.json(foundItem)
    } else {
      const giftMetaData = await metadata(url)

      addedGift = await Item.create({
        url,
        image: giftMetaData.image,
        name: giftMetaData.title
      })

      // update the gifts table with item id
      await Gift.create({
        status: 'Pending',
        itemId: addedGift.id,
        receiverId
      })

      res.json(addedGift)
    }

  } catch (err) { next(err) }
})

module.exports = router
