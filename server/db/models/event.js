const Sequelize = require('sequelize');
const db = require('../db');

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'My Event'
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  genres: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true
  },
  hasEnded: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  montageURL: {
    type: Sequelize.STRING,
    validate: {
      isURL: true
    }
  }
})

module.exports = Event
