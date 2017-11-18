const Sequelize = require('sequelize');
const db = require('../db');

const Song = db.define('song', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: false
  },
  genre: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true
  },
  spotifySongId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  danceability: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  energy: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  loudness: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  speechiness: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  acousticness: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  instrumentalness: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  valence: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  tempo: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  popularity: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
})

module.exports = Song
