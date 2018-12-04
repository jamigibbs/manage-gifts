'use strict'

const db = require('../server/db')
const data = require('./data.json')
const {User, List, Item, Gift, Receiver} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // Users
  await Promise.all(
    data.user.map( async (user) => {
      await User.create(user)
    })
  ).then(() => {
    console.log(`seeded ${data.user.length} users`)
  }).catch(error => console.log(error))

  // Lists
  await Promise.all(
    data.list.map( async (list) => {
      await List.create(list)
    })
  ).then(() => {
    console.log(`seeded ${data.list.length} lists`)
  }).catch(error => console.log(error))

  // Receivers
  await Promise.all(
    data.receiver.map( async (receiver) => {
      await Receiver.create(receiver)
    })
  ).then(() => {
    console.log(`seeded ${data.receiver.length} receivers`)
  }).catch(error => console.log(error))

  // Items
  await Promise.all(
    data.item.map( async (item) => {
      await Item.create(item)
    })
  ).then(() => {
    console.log(`seeded ${data.item.length} items`)
  }).catch(error => console.log(error))

  // Gifts
  await Promise.all(
    data.gift.map( async (gift) => {
      await Gift.create(gift)
    })
  ).then(() => {
    console.log(`seeded ${data.gift.length} gifts`)
  }).catch(error => console.log(error))

  console.log(`everything seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
