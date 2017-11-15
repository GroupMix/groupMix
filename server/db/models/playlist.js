const Sequelize = require('sequelize')
const db = require('../db')

const Playlist = db.define('playlist', {
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isInt: true
  },
  playlistName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  spotifyPlaylistId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isInt: true
  }
})

module.exports = Playlist
