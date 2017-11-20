const Sequelize = require('sequelize');
const db = require('../db');

const Song = db.define('song', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  spotifyArtistId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  artist: {
    type: Sequelize.STRING,
    allowNull: true
  },
  genre: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true
  },
  spotifySongId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  danceability: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  energy: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  loudness: {
    type: Sequelize.DECIMAL,
    allowNull: true
  },
  speechiness: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  acousticness: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  instrumentalness: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  valence: {
    type: Sequelize.FLOAT,
    allowNull: true
  },
  tempo: {
    type: Sequelize.DECIMAL,
    allowNull: true
  },
  popularity: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
})

module.exports = Song
