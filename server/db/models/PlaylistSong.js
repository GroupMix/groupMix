
const Sequelize = require('sequelize')
const db = require('../db')

const PlaylistSong = db.define('event', {
  playlistId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  songId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priority: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = PlaylistSong

