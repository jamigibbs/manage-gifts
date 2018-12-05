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
  const { receiverId, isUrl } = req.body.giftData
  let gift = req.body.giftData.gift.name
  let price = Number(req.body.giftData.gift.price)
  let addedGift = {}
  let data = {}

  if (req.body.isUrl) {
    gift = decodeURIComponent(gift)
  }

  try {
    // check if url exists already in db
    const foundItem = await Item.findOne({
      where: { url: gift }
    })

    if (foundItem) {
      // update the gifts table with item id
      addedGift = await Gift.create({
        status: 'Pending',
        itemId: foundItem.id,
        receiverId,
        price
      })

      // send back correctly formed data
      data = addedGift.dataValues
      data.item = foundItem.dataValues

    } else {
      // For item that doesn't already exist on our db,
      // let's create it
      let item

      if (isUrl) {
        const giftMetaData = await metadata(gift)
        item = await Item.create({
          url: giftMetaData.url,
          image: giftMetaData.image,
          name: giftMetaData.title
        })
      } else {
        item = await Item.create({
          url: null,
          image: null,
          name: gift
        })
      }

      // update the gifts table with item id
      addedGift = await Gift.create({
        status: 'Pending',
        itemId: item.id,
        receiverId,
        price
      })

      // send back correctly formed data
      data = addedGift.dataValues
      data.item = item.dataValues
    }

    res.json(data)
  } catch (err) { next(err) }
})

module.exports = router
