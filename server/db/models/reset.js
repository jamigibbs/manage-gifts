const Sequelize = require('sequelize')
const db = require('../db')

const Reset = db.define('reset', {
  token: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = Reset
