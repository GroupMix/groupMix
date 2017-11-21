const router = require('express').Router()
const { Event, User, Playlist } = require('../db/models')

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
      Playlist.create({eventId: event.id})
      res.json(event)
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
