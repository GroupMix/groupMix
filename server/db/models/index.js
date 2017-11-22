const User = require('./user')
const Event = require('./event')
const Playlist = require('./playlist')
const Song = require('./song')
const PlaylistSong = require('./PlaylistSong')
const EventUser = require('./eventUser')

//Associations
User.belongsToMany(Event, {through: EventUser})
Event.belongsToMany(User, {through: EventUser})
Event.hasOne(Playlist)
Playlist.belongsToMany(Song, {through: {model: PlaylistSong, unique: false}, constraints: false})
Song.belongsToMany(Playlist, {through: {model: PlaylistSong, unique: false}, constraints: false})
User.hasMany(PlaylistSong, {constraints: false, unique: false})
PlaylistSong.hasOne(User, {constraints: false, unique: false})

module.exports = {
  User,
  Event,
  Playlist,
  Song,
  PlaylistSong,
  EventUser
}
