const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Item
