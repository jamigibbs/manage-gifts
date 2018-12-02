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
  console.log(req.body)
  const {receiverId, isUrl } = req.body
  let gift = req.body.gift
  let addedGift = {}
  let data = {}

  if (req.body.isUrl) {
    gift = decodeURIComponent(gift)
  }

  try {
    // Cleanup those hairy amazon links
    if ( isDomain(gift, 'amazon.com') ) {
      gift = removeLinkParams(gift)
    }

    // check if url exists already in db
    const foundItem = await Item.findOne({
      where: { url: gift }
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
      let item

      if (isUrl) {
        const giftMetaData = await metadata(gift)
        item = await Item.create({
          url: gift,
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
