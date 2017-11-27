const router = require('express').Router();
const { PlaylistSong, Event, Playlist, Song, eventUsers } = require('../db/models');
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
      hostEnergy = event.energy * 0.9;
      hostAcousticness = event.acousticness * 0.9;
      hostValence = event.valence * 0.9
      hostGenres = event.genres
      hostDanceabilityWeight = event.danceabilityWeight;
      hostLoudnessWeight = event.loudnessWeight;
      hostEnergyWeight = event.energyWeight;
      hostAcousticnessWeight = event.acousticnessWeight;
      hostValenceWeight = event.valenceWeight;
      return Playlist.findOne({ where: { eventId: req.params.eventId } })
    })
    .then((playlist) => {
      playlistId = playlist.id
      return PlaylistSong.findAll({ where: { playlistId: playlist.id, played: false} })
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

      //returns promise that resolves to array of values
      Bluebird.all(promisesArr)
        .then((songsArr) => {
          let songMatchPromisesArr = songsArr.map((song) => {
            let pointsToAdd = 0
            let match = ''
            let genreMatch = false
            let matchGenre = ''
            genreMatch = hostGenres.some((genre) => {
              matchGenre = genre
              return song.genres.indexOf(genre) > -1
            })
           if (song.popularity > 75){
                pointsToAdd += 8
                match += 'highlypopular'
           }
           if (song.popularity <= 75 && song.popularity > 50){
                pointsToAdd += 4
                match += 'mediumpopular'
            }
            if (genreMatch) {
              pointsToAdd += 24
              match += ('genrematchof' + matchGenre)
            }
            if (song.danceability > hostDanceability - 0.12 && song.danceability < hostDanceability + 0.15) {
              pointsToAdd +=  (6 * hostDanceabilityWeight)
              match += 'danceability'
            }
            if (song.loudness > hostLoudness - 3 && song.loudness < hostLoudness + 3) {
              pointsToAdd += (6 * hostLoudnessWeight)
              match += 'loudness'
            }
            if (song.energy > hostEnergy - 0.12 && song.energy < hostEnergy + 0.15) {
              pointsToAdd += (6 * hostEnergyWeight)
              match += 'energy'
            }
            if (song.acousticness > hostAcousticness - 0.12 && song.acoustisness < hostAcousticness + 0.15) {
              pointsToAdd += (6 * hostAcousticnessWeight)
              match += 'acousticness'
            }
            if (song.valence > hostValence - 0.12 && song.valence < hostValence + 0.15) {
              pointsToAdd += (6 * hostValenceWeight)
              match += 'valence'
            }

            let keyName = song.id.toString()
            if (requestCount[keyName] > 1) { pointsToAdd += requestCount[keyName] * 4 }

            //QUESTION: warning: a promise was created in a handler at /Users/steveaksamit/steve_projects/Group_Mix/server/api/playlistSongs.js:83:59 but was not returned from it
            return PlaylistSong.findAll({ where: { songId: song.id } })
              .then((playlistSong) => {
                playlistSong.forEach((duplicateSong) => {
                 duplicateSong.update({ priority: pointsToAdd, match: match })
                })
              })
          })
          Bluebird.all(songMatchPromisesArr)
        })
    })

})

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

router.delete('/clearPLSongs/:eventId', (req, res, next) => {
  Playlist.findOne({ where: { eventId: req.params.eventId } })
    .then(playlist => playlist.id)
    .then(playlistId => {
      return PlaylistSong.destroy({ where: { playlistId: playlistId } })
    })
    .then(deletedSongs => {
      res.send('songs deleted')
    })
    .catch(next)
})
router.delete('/:playlistId/:songId', (req, res, next) => {
  let playId = req.params.playlistId;
  let songId = req.params.songId;

  PlaylistSong.findAll({ where: { playlistId: playId, songId: songId } })
    .then(song => song.destroy())
    .then(() => res.status(204).end())
    .catch(next);
});

router.put('/markAsPlayed/:spotifySongId', (req, res, next) => {
  Song.findOne({where: {spotifySongId: req.params.spotifySongId}})
  .then(song => {
    return PlaylistSong.update({played: true, priority: 0}, {where: {songId: song.id}})
  })
  .then(() => {
    console.log(red('song updated'), )
    res.sendStatus(204)
  })
  .catch(next)
})

router.put('/:playlistId/:songId', (req, res, next) => {
  let playId = req.params.playlistId;
  let songId = req.params.songId;
  PlaylistSong.findAll({ where: { playlistId: playId, songId: songId } })
    .then(song => song.update({ priority: req.body }))
    .then(song => res.status(201).send(song))
    .catch(next);
});
