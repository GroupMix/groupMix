
const Sequelize = require('sequelize')
const db = require('../db')

const PlaylistSong = db.define('playlistSong', {
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
  },
  requests: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = PlaylistSong

