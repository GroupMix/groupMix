
const Sequelize = require('sequelize')
const db = require('../db')
const {Event, Song, Playlist} = require('../models')


const PlaylistSong = db.define('playlistSong', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  playlistId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  songId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isUnique: false
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  priority: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  requests: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})


module.exports = PlaylistSong

