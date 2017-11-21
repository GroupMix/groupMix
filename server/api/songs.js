const router = require('express').Router();
const { Song, PlaylistSong, Playlist } = require('../db/models');
// const { addPlaylistSongThunk } = require( '../../client/store/playlistSongs.js')

module.exports = router

router.post('/', (req, res, next) => {

  let song = {
    name: req.body.name,
    artist: req.body.artist,
    spotifyArtistId: req.body.spotifyArtistId,
    spotifySongId: req.body.spotifySongId,
    danceability: req.body.danceability,
    energy: req.body.energy,
    loudness: req.body.loudness,
    speechiness: req.body.speechiness,
    acousticness: req.body.acousticness,
    instrumentalness: req.body.instrumentalness,
    valence: req.body.valence,
    tempo: req.body.tempo,
    popularity: req.body.popularity,
    genres: req.body.genres,
  }
  let playlistId;
  Playlist.findOne({ where: { eventId: req.body.playlistId } })
    .then(playlist => {
      playlistId = playlist.id
      return playlistId
    })
    .then( playId => {
     return Song.findOrCreate({
      where: song
    }
    )})
    .spread(createdSong => {
      return createdSong.id
    })
    .then(songId => {
      let playlistSong = {
        playlistId: playlistId,
        songId: songId,
        priority: 0,
        userId: req.body.userId
      }
      PlaylistSong.create(playlistSong)
        .then(foundPlaylistSong => {
          res.status(201).json(foundPlaylistSong)
        }
        )
    })
    .catch(next);

});

// router.post('/', (req, res, next) => {
//   Song.findOrCreate(req.body)
//     .then(songs => res.status(201).json(songs))
//     .catch(next);
// });

router.get('/:songId', (req, res, next) => {
  Song.findById(req.params.songId)
    .then(song => res.status(201).send(song))
    .catch(next);
});

router.delete('/:songId', (req, res, next) => {
  Song.findById(req.params.songId)
    .then(song => song.destroy())
    .then(() => res.status(204).end())
    .catch(next);
});
