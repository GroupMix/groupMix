const router = require('express').Router();
const { PlaylistSong, Event, Playlist, Song, EventUser } = require('../db/models');
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
  let hostInstrumentalness = 0;
  let hostTempo = 0;
  let hostDanceabilityWeight = 0;
  let hostLoudnessWeight = 0;
  let hostEnergyWeight = 0;
  let hostAcousticnessWeight = 0;
  let hostValenceWeight = 0;
  let hostInstrumentalnessWeight = 0;
  let hostTempoWeight = 0;
  let hostGenres = [];
  let playlistId = 0;
  let requestCount = {}
  let presentUsersArr = []
  let pointsCache = {}
  let matchCache = {}
  EventUser.findAll({ where: { eventId: req.params.eventId, atEvent: true } })
    .then((presentUsers) => {
      presentUsers.forEach((presentUser) => presentUsersArr.push(presentUser.userId))
    })
    .then(() => {
      return Event.findById(req.params.eventId)
    })
    .then(event => {
      hostDanceability = event.danceability * 0.9;
      hostLoudness = (((1.4 - +event.loudness) * 12)) * -1;
      hostEnergy = event.energy * 0.9;
      hostAcousticness = event.acousticness * 0.9;
      hostValence = event.valence * 0.9;
      hostInstrumentalness = event.instrumentalness * 0.9;
      hostTempo = event.tempo;
      hostGenres = event.genres
      hostDanceabilityWeight = event.danceabilityWeight;
      hostLoudnessWeight = event.loudnessWeight;
      hostEnergyWeight = event.energyWeight;
      hostAcousticnessWeight = event.acousticnessWeight;
      hostValenceWeight = event.valenceWeight;
      hostInstrumentalnessWeight = event.instrumentalnessWeight;
      hostTempoWeight = event.tempoWeight;
      return Playlist.findOne({ where: { eventId: req.params.eventId } })
    })
    .then((playlist) => {
      playlistId = playlist.id
      return PlaylistSong.findAll({ where: { playlistId: playlist.id, played: false } })
    })
    .then((playlistSongs) => {
      let itemsProcessed = 0;
      return playlistSongs.map((playlistSong) => {
        let key = playlistSong.songId.toString()
        if (!requestCount.hasOwnProperty(key)) requestCount[key] = 1
        else requestCount[key]++
        return playlistSong.songId
      })
    })
    .then((idsArr) => {
      return idsArr.map((id) => {
        return Song.findById(id)
      })
    })
    .then((promisesArr) => {
      //returns promise that resolves to array of values
      return Bluebird.all(promisesArr)
    })
    .then((songsArr) => {
      return songsArr.map((song) => {
        let pointsToAdd = 0
        let match = ''
        let genreMatch = false
        let matchGenre = ''
        genreMatch = hostGenres.some((genre) => {
          matchGenre = genre
          return song.genres.indexOf(genre) > -1
        })
        if (song.popularity > 75) {
          pointsToAdd += 8
          match += 'highlypopular,'
        }
        if (song.popularity <= 75 && song.popularity > 50) {
          pointsToAdd += 4
          match += 'mediumpopular,'
        }
        if (genreMatch) {
          pointsToAdd += 24
          match += ('genrematchof' + matchGenre + ',')
        }
        if (song.danceability > hostDanceability - 0.12 && song.danceability < hostDanceability + 0.15) {
          pointsToAdd += (6 * hostDanceabilityWeight)
          match += 'danceability,'
        }
        if (song.loudness > hostLoudness - 3 && song.loudness < hostLoudness + 3) {
          pointsToAdd += (6 * hostLoudnessWeight)
          match += 'loudness,'
        }
        if (song.energy > hostEnergy - 0.12 && song.energy < hostEnergy + 0.15) {
          pointsToAdd += (6 * hostEnergyWeight)
          match += 'energy,'
        }
        if (song.acousticness > hostAcousticness - 0.12 && song.acousticness < hostAcousticness + 0.15) {
          pointsToAdd += (6 * hostAcousticnessWeight)
          match += 'acousticness,'
        }
        if (song.valence > hostValence - 0.12 && song.valence < hostValence + 0.15) {
          pointsToAdd += (6 * hostValenceWeight)
          match += 'valence,'
        }
        if (song.instrumentalness > hostInstrumentalness - 0.12 && song.instrumentalness < hostInstrumentalness + 0.15) {
          pointsToAdd += (6 * hostInstrumentalnessWeight)
          console.log('SONG.INSTRUMENTALNESSSSSSSASASSSSSSSS', song.instrumentalness, hostInstrumentalness, hostInstrumentalnessWeight)
          match += 'instrumentalness,'
        }
        if (song.tempo > hostTempo - 10 && song.tempo < hostTempo + 10) {
          pointsToAdd += (6 * hostTempoWeight)
          match += 'tempo,'
        }

        let keyName = song.id.toString()
        if (requestCount[keyName] > 1) { pointsToAdd += requestCount[keyName] * 4 }


        let key = song.id.toString()
        pointsCache[key] = pointsToAdd
        matchCache[key] = match

        return PlaylistSong.findAll({ where: { songId: song.id } })
      })
    })
        .then((songMatchPromisesArr) => {
          return Bluebird.all(songMatchPromisesArr)
        })
        .then((playlistSongArr) => {
          return playlistSongArr.map((duplicateSongArr) => {
            let tempKey = duplicateSongArr[0].userId.toString()
            let checkedIn = false
            if (presentUsersArr.indexOf(tempKey) !== -1) {
              checkedIn = true
            }
             duplicateSongArr.forEach((duplicate) => {
              let key = duplicate.songId.toString()
              if (checkedIn) pointsCache[key] += 20
              matchCache[key] += 'atevent,'
              duplicate.update({ priority: pointsCache[key], match: matchCache[key] })
            })
          })
        })
          .then((songsToUpdate) => {
            Bluebird.all(songsToUpdate)
          })
          .then(()=>{
            res.json(201)
          })
        .catch(next)
    })

router.put('/voteSong/:eventId', (req, res, next) => {
  console.log(req.body)
  Playlist.findOne({ where: {eventId: req.params.eventId} })
  .then(playlist => {
    return PlaylistSong.findOne({
      where: {
        playlistId: playlist.id,
        songId: req.body.songId
      }})
  })
  .then(song => {
    req.body.vote == 'up' ? song.increment('priority') : song.decrement('priority')
    res.json(song.priority)
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
    Song.findOne({ where: { spotifySongId: req.params.spotifySongId } })
      .then(song => {
        return PlaylistSong.update({ played: true, priority: 0 }, { where: { songId: song.id } })
      })
      .then(() => {
        console.log('song updated')
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
