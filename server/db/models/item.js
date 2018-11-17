const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  url: {
    type: Sequelize.STRING(1000),
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(1000)
  },
  image: {
    type: Sequelize.STRING(1000)
  }
})

module.exports = Item
