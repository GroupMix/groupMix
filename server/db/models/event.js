const Sequelize = require('sequelize');
const db = require('../db');

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'My Event'
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genres: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true
  },
  danceability: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
      max: 1
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 0.0
  },
  danceabilityWeight: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 10
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 1.0
  },
  loudness: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
      max: 1
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 0.0
  },
  loudnessWeight: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 10
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 1.0
  },
  energy: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
      max: 1
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 0.0
  },
  energyWeight: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 10
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 1.0
  },
  acousticness: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
      max: 1
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 0.0
  },
  acousticnessWeight: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 10
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 1.0
  },
  valence: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
      max: 1
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 0.0
  },
  valenceWeight: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 10
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 1.0
  },
  instrumentalness: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0,
      max: 1
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 0.0
  },
  instrumentalnessWeight: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 10
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 1.0
  },
  tempo: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0,
      max: 160
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 0.0
  },
  tempoWeight: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 10
    },
    isRequired: true,
    allowNull: false,
    defaultValue: 1.0
  },
  hasEnded: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  hasStarted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  playlistURL: {
    type: Sequelize.STRING,
    validate: {
      isURL: true
    }
  }
})

module.exports = Event
