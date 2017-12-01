const router = require('express').Router()
const { PlaylistSong, Playlist, Song } = require('../db/models')

module.exports = router


// Gets event by id
router.get('/:eventId', (req, res, next) => {
  Playlist.findOne({where: {eventId: req.params.eventId}})
  .then((playlist) => {
    return PlaylistSong.findAll({
      where: {playlistId: playlist.id},
      order: [['priority', 'DESC']]
    })
  })
  .then(songs => {
    res.json(songs)
  })
  .catch(next)
})
