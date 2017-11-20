
const Sequelize = require('sequelize')
const db = require('../db')
const {Event, Song, Playlist} = require('../models')


const PlaylistSong = db.define('playlistSong', {
  playlistId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  songId: {
    type: Sequelize.INTEGER,
    allowNull: false
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
    allowNull: false
  }
})

PlaylistSong.prioritize = ((eventId) => {
  let hostDanceability = 0;
  let hostLoudness = 0;
  let hostEnergy = 0;
  let hostAcousticness = 0;
  let hostValence = 0;
  let hostGenres = [];
  let playlistId = 0;
  Event.findById(eventId)
  .then(event => {
    hostDanceability = event.danceability * 0.75;
    hostLoudness = event.loudness * 0.75;
    hostEnergy = event.energy * 0.75;
    hostAcousticness = event.acousticness * 0.75;
    hostValence = event.valence * 0.75
    hostGenres = event.genres
    return Playlist.findOne({where: {eventId: eventId}})
  })
  .then((playlist) => {
    playlistId = playlist.id
    return PlaylistSongs.findAll({where: {playlistId: playlist.id}})
  })
  .then((playlistSongs) => {
      playlistSongs.forEach((playlistSong) => {
        let pointsToAdd = 0
        let genreMatch = false
        Song.findById(playlistSong.songId)
        .then((song) => {
          genreMatch = hostGenres.some((genre) => {
            return Song.genre.indexOf(genre) > -1
          })
          if (genreMatch) pointsToAdd += 15
          if (Song.danceability > hostDanceability - 0.1 &&  Song.danceability < hostDanceability + 0.1) pointsToAdd += 5
          if (Song.loudness > hostLoudness - 0.1 &&  Song.loudness < hostLoudness + 0.1) pointsToAdd += 5
          if (Song.energy > hostEnergy - 0.1 &&  Song.energy < hostEnergy + 0.1) pointsToAdd += 5
          if (Song.acousticness > hostAcousticness - 0.1 &&  Song.acoustisness < hostAcousticness + 0.1) pointsToAdd += 5
          if (Song.valence > hostValence - 0.1 &&  Song.valence < hostValence + 0.1) pointsToAdd += 5
          playlistSong.increment('priority', {by: pointsToAdd})
        })
      })
  })
  .then(() => {
    return PlaylistSongs.findAll({
      attributes:[[Sequelize.literal('distinct `userId`'),'userId'], [Sequelize.literal('`songId`'),'songId']]
    })
  .then((distinctPlaylistSongs) => {
    console.log('Distinct Playlist Songs Length: ', distinctPlaylistSongs.length)
    distinctPlaylistSongs.forEach((distinctPlaylistSong) => {
      PlaylistSong.findAll({where: {playlistId: playlistId, songId: distinctPlaylistSong.id}})
      })
      .then((similarSongs) => {
        let songInstanceCount = similarSongs.length
        similarSongs.forEach((similarSong) => {
        similarSong.increment('priority', {by: songInstanceCount * 6})
        })
      })
    })
  })
})

module.exports = PlaylistSong

