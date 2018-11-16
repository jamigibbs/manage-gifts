const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  }
})

module.exports = Item
