const User = require('./user')
const Event = require('./event')
const Playlist = require('./playlist')
const Song = require('./song')
const PlaylistSong = require('./playlistSong')
const EventUser = require('./eventUser')

//Associations
User.belongsToMany(Event, {through: EventUser})
Event.belongsToMany(User, {through: EventUser})
Event.hasOne(Playlist)
Playlist.belongsToMany(Song, {through: PlaylistSong, unique: false})
Song.belongsToMany(Playlist, {through: PlaylistSong, unique: false})
User.hasMany(PlaylistSong)
PlaylistSong.hasOne(User)

module.exports = {
  User,
  Event,
  Playlist,
  Song,
  PlaylistSong,
  EventUser
}
