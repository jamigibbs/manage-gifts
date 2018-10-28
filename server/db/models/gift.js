const Sequelize = require('sequelize')
const db = require('../db')

const Gift = db.define('gift', {
  status: {
    type: Sequelize.ENUM('Pending', 'Purchased', 'Given'),
    allowNull: false,
    defaultValue: 'Pending'
  }
})

module.exports = Gift
