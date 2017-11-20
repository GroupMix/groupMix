const router = require('express').Router();
const { Song } = require('../db/models');

module.exports = router

router.post('/', (req, res, next) => {

    // Promise.all(req.body.map(song =>
    //   Song.findOrCreate({
    //     where: {
    //       name: req.body.name
    //     }
    //   })
    // ))
    // .then(songs => res.status(201).json(songs))
    // .catch(err => {
    //   console.error(err);
    // })

    Song.findOrCreate({
      where: {
        name: req.body.name,
        artist: req.body.artist,
        spotifyArtistId: req.body.artistId,
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
      }
    })
        .then(song => res.status(201).json(song))
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
