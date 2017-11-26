const router = require('express').Router()
const { Event, User, Playlist } = require('../db/models')
const SpotifyWebApi = require('spotify-web-api-js');
const SpotifyApi = new SpotifyWebApi()

module.exports = router

// get all users associated with this event
router.get('/users/:eventId', (req, res, next) => {
  Event.findById(req.params.eventId)
    .then(event => event.getUsers())
    .then(users => res.json(users))
    .catch(next)
})

// Gets event by id
router.get('/:eventId', (req, res, next) => {
  Event.findById(req.params.eventId)
    .then(event => {
      res.json(event)
    })
    .catch(next)
})

// Creates a new event and playlist entry
router.post('/', (req, res, next) => {
  Event.create(req.body)
    .then(event => {
      event.setUsers([req.user.id], { through: { isHost: true, isAttending: true } })
      return event
    })
    .then(event => {
      let eventId = event.id * 1
      Playlist.create({ eventId: eventId, spotifyPlaylistId: req.body.playlistId, spotifyPlaylistUri: req.body.uri })
      res.json(event)
    })
    .catch(next)
})

// Edit an event
router.put('/:eventId', (req, res, next) => {
  Event.update(req.body, {
    where: {
      id: req.params.eventId
    }, returning: true
  })
    .then(updatedEvent => {
      res.json(updatedEvent[1][0])
    })
    .catch(next)
})


router.post('/user/:eventId', (req, res, next) => {
  Event.findById(req.params.eventId)
    .then(event => {
      event.addUsers([req.body.userId], { through: { isHost: false, isAttending: null } })
    })
    .then(() => {
      return User.findById(req.body.userId)
    })
    .then(user => {
      res.json(user)
    })
    .catch(next)
});

router.put(`/user/:eventId`, (req, res, next) => {
  Event.findById(req.params.eventId)
    .then(event => {
      return event.removeUsers([req.body.userId])
    })
    .then(() => res.json(req.body.userId))
    .catch(next)
})

router.delete(`/:eventId`, (req, res, next) => {
  Event.destroy({
    where: {
      id: req.params.eventId
    }
  })
    .then(deletedEvent => {
      res.json(deletedEvent)
    })
    .catch(next)
})

router.get('/playlist/:eventId', (req, res, next) => {
  Playlist.findOne({ where: { eventId: req.params.eventId } })
    .then((playlist) => {
      res.json(playlist)
    })
})
