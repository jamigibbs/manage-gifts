const {List, Gift, Receiver} = require('../server/db/models')

const newUserSeed = async function(user) {

    // create empty demo list
    await List.create({
      name: 'Family Holiday Trip',
      userId: user.id
    })

    // create populated demo list
    const demoList = await List.create({
      name: 'Office Christmas Party',
      userId: user.id
    })

    const receivers = [
      {"name": "Jim Halpert", "listId": demoList.dataValues.id},
      {"name": "Angela Martin", "listId": demoList.dataValues.id},
      {"name": "Dwight Schrute", "listId": demoList.dataValues.id},
      {"name": "Pam Beesly", "listId": demoList.dataValues.id}
    ]

    // Add demo receivers and gifts to list
    await Promise.all(
      receivers.map( async (receiver) => {
        await Receiver.create(receiver).then( async (data) => {
          const receiverId = data.dataValues.id
          if (data.dataValues.name === 'Jim Halpert') {
            await Gift.create({purchased: true, itemId: 1, receiverId, price: 9.99})
            await Gift.create({purchased: true, itemId: 2, receiverId, price: 9.99})
            await Gift.create({purchased: true, itemId: 3, receiverId, price: 9.99})
            await Gift.create({purchased: false, itemId: 4, receiverId, price: 9.99})
          } else if (data.dataValues.name === 'Angela Martin') {
            await Gift.create({purchased: true, itemId: 5, receiverId, price: 9.99})
            await Gift.create({purchased: true, itemId: 6, receiverId, price: 9.99})
            await Gift.create({purchased: false, itemId: 7, receiverId, price: 9.99})
          } else if (data.dataValues.name === 'Dwight Schrute') {
            await Gift.create({purchased: false, itemId: 8, receiverId, price: 9.99})
            await Gift.create({purchased: false, itemId: 9, receiverId, price: 9.99})
            await Gift.create({purchased: false, itemId: 10, receiverId, price: 9.99})
          } else if (data.dataValues.name === 'Pam Beesly') {
            await Gift.create({purchased: true, itemId: 11, receiverId, price: 9.99})
            await Gift.create({purchased: false, itemId: 12, receiverId, price: 9.99})
            await Gift.create({purchased: false, itemId: 13, receiverId, price: 9.99})
          }
        })
      })
    ).catch(error => console.log(error))
}

module.exports = newUserSeed
