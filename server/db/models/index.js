const User = require('./user')
const Event = require('./user')
const Playlist = require('./user')
const Song = require('./user')
const PlaylistSong = require('./user')
const EventUser = require('./user')

//Associations
User.belongsToMany(Event, {through: EventUser})
Event.belongsToMany(User, {through: EventUser})
Event.hasOne(Playlist)
Playlist.belongsToMany(Song, {through: PlaylistSong})
Song.belongsToMany(Playlist, {through: PlaylistSong})

module.exports = {
  User,
<<<<<<< HEAD
  Event,
  Playlist,
  Song,
  PlaylistSong,
  EventUser
=======
>>>>>>> master
}
