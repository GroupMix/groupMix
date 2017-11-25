const router = require('express').Router();
const { PlaylistSong, Event, Playlist, Song } = require('../db/models');
const Sequelize = require('sequelize')
const Bluebird = require('bluebird')
const red = require('chalk').red

module.exports = router

router.get(`/prioritize/:eventId`, (req, res, next) => {
  let hostDanceability = 0;
  let hostLoudness = 0;
  let hostEnergy = 0;
  let hostAcousticness = 0;
  let hostValence = 0;
  let hostDanceabilityWeight = 0;
  let hostLoudnessWeight = 0;
  let hostEnergyWeight = 0;
  let hostAcousticnessWeight = 0;
  let hostValenceWeight = 0;
  let hostGenres = [];
  let playlistId = 0;
  let requestCount = {}
  Event.findById(req.params.eventId)
    .then(event => {
      hostDanceability = event.danceability * 0.9;
      hostLoudness = (((1.4 - +event.loudness) * 12)) * -1;
      console.log("loud", hostLoudness)
      hostEnergy = event.energy * 0.9;
      hostAcousticness = event.acousticness * 0.9;
      hostValence = event.valence * 0.9
      hostGenres = event.genres
      hostDanceabilityWeight = event.danceabilityWeight;
      hostLoudnessWeight = event.loudnessWeight;
      hostEnergyWeight = event.energyWeight;
      hostAcousticnessWeight = event.acoustisnessWeight;
      hostValenceWeight = event.valenceWeight;
      return Playlist.findOne({ where: { eventId: req.params.eventId } })
    })
    .then((playlist) => {
      playlistId = playlist.id
      return PlaylistSong.findAll({ where: { playlistId: playlist.id } })
    })
    .then((playlistSongs) => {
      let itemsProcessed = 0;
      let idsArr = playlistSongs.map((playlistSong) => {
        let key = playlistSong.songId.toString()
        if (!requestCount.hasOwnProperty(key)) requestCount[key] = 1
        else requestCount[key]++
        return playlistSong.songId
      })

      let promisesArr = idsArr.map((id) => {
        return Song.findById(id)
      })
      //resturns promise that resolves to array of values
      Bluebird.all(promisesArr)
        .then((songsArr) => {
          let songMatchPromisesArr = songsArr.map((song) => {
            let pointsToAdd = 0
            let genreMatch = false
            genreMatch = hostGenres.some((genre) => {
              return song.genres.indexOf(genre) > -1
            })
            switch (song.popularity) {
              case (song.popularity > 75):
                pointsToAdd += 8
              case (song.popularity <= 75 && song.popularity > 50):
                pointsToAdd += 4
            }
            if (genreMatch) pointsToAdd += 15
            if (song.danceability > hostDanceability - 0.12 && song.danceability < hostDanceability + 0.15) pointsToAdd += (6 * hostDanceabilityWeight)
            if (song.loudness > hostLoudness - 3 && song.loudness < hostLoudness + 3) pointsToAdd += (4 * hostLoudnessWeight)
            if (song.energy > hostEnergy - 0.12 && song.energy < hostEnergy + 0.15) pointsToAdd += (5 * hostEnergyWeight)
            if (song.acousticness > hostAcousticness - 0.12 && song.acoustisness < hostAcousticness + 0.15) pointsToAdd += (7 * hostAcousticnessWeight)
            if (song.valence > hostValence - 0.12 && song.valence < hostValence + 0.15) pointsToAdd += (3 * hostValenceWeight)

            let keyName = song.id.toString()
            if (requestCount[keyName] > 1) { pointsToAdd += requestCount[keyName] * 4 }

            //produces promise warning in back-end console; optimize if time
            return PlaylistSong.findAll({ where: { songId: song.id } })
              .then((playlistSong) => {
                playlistSong.forEach((duplicateSong) => {
                  return duplicateSong.update({ priority: pointsToAdd })
                })
              })
          })
          Bluebird.all(songMatchPromisesArr)
            .then(() => {
              console.log(red("DONE"))
            })
        })
    })
})


// .then(() => {
//   console.log('sdf')
// })
// .then(() => {
//   return PlaylistSong.findAll({
//     // attributes:[[Sequelize.literal('distinct `userId`'),'userId'], [Sequelize.literal('`songId`'),'songId']]
//     attributes:[[Sequelize.literal('distinct `userId`'),'userId'], [Sequelize.literal('`songId`'),'songId']]
//   })
// .then((distinctPlaylistSongs) => {
//   console.log('Distinct Playlist Songs Length: ', distinctPlaylistSongs.length)
//   distinctPlaylistSongs.forEach((distinctPlaylistSong) => {
//     PlaylistSong.findAll({where: {playlistId: playlistId, songId: distinctPlaylistSong.id}})
//     })
//     .then((similarSongs) => {
//       let songInstanceCount = similarSongs.length
//       similarSongs.forEach((similarSong) => {
//       similarSong.increment('priority', {by: songInstanceCount * 6})
//       })
//     })
//   })
// })
// })



router.post('/', (req, res, next) => {
  PlaylistSong.findOrCreate({
    where: req.body
  })
    .then(song => {
      res.status(201).json(song)
    }
    )
    .catch(next);
});

router.get('/:playlistId/:songId', (req, res, next) => {
  let playId = req.params.playlistId;
  let songId = req.params.songId;
  PlaylistSong.findAll({ where: { playlistId: playId, songId: songId } })
    .then(song => res.status(201).send(song))
    .catch(next);
});

router.get('/:playlistId', (req, res, next) => {
  let id = req.params.playlistId;
  PlaylistSong.findAll({ where: { playlistId: id } })
    .then(song => res.status(201).send(song))
    .catch(next);
});

router.delete('/:playlistId/:songId', (req, res, next) => {
  let playId = req.params.playlistId;
  let songId = req.params.songId;

  PlaylistSong.findAll({ where: { playlistId: playId, songId: songId } })
    .then(song => song.destroy())
    .then(() => res.status(204).end())
    .catch(next);
});

router.put('/:playlistId/:songId', (req, res, next) => {
  let playId = req.params.playlistId;
  let songId = req.params.songId;
  PlaylistSong.findAll({ where: { playlistId: playId, songId: songId } })
    .then(song => song.update({ priority: req.body }))
    .then(song => res.status(201).send(song))
    .catch(next);
});



