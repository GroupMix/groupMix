
const Sequelize = require('sequelize')
const db = require('../db')
const {Event, Song, Playlist, EventUser} = require('../models')


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
  },
  played: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  match: {
    type: Sequelize.STRING
  },
  votes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

// PlaylistSong.prototype.addPointsIfPresent = () => {
//         EventUser.findOne({where: {userId: this.userId, eventId: this.eventId}})
//         .then((eventUser)=>{
//           increment = eventUser.atEvent ? 20 : 1 
//           this.priority = increment
//         })
// }

// {
//     hooks: {
//       afterUpdate: playlistSong => {
//       EventUser.findOne({where: {userId: playlistSong.userId, eventId: playlistSong.eventId}})
//         .then((eventUser)=>{
//           increment = eventUser.atEvent ? 20 : -60 
//           playlistSong.priority = increment
//         })
//       }
//     }
//   }



module.exports = PlaylistSong

