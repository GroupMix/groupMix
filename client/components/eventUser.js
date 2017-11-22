const Sequelize = require('sequelize')
const db = require('../db')

const EventUser = db.define('eventUser', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isInt: true
  },
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isInt: true
  },
  isHost: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isAttending: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: null
  },
  atEvent: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = EventUser
