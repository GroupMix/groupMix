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
  danceability: {
    type: Sequelize.DECIMAL(2, 1),
    isRequired: true,
    allowNull: false,
    defaultValue: 0.0
  },
  loudness: {
    type: Sequelize.DECIMAL(2, 1),
    isRequired: true,
    allowNull: false,
    defaultValue: 0.0
  },
  energy: {
    type: Sequelize.DECIMAL(2, 1),
    isRequired: true,
    allowNull: false,
    defaultValue: 0.0
  },
  acousticness: {
    type: Sequelize.DECIMAL(2, 1),
    isRequired: true,
    allowNull: false,
    defaultValue: 0.0
  },
  valence: {
    type: Sequelize.DECIMAL(2, 1),
    isRequired: true,
    allowNull: false,
    defaultValue: 0.0
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
