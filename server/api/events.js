const router = require('express').Router()
const { Event, User } = require('../db/models')

module.exports = router

// get all events associated with this user
router.get('/users/:eventId', (req, res, next) => {
  Event.findById(req.params.eventId)
  .then(event => event.getUsers())
  .then(users => res.json(users))
  .catch(next)
})

// Creates a new event 
router.post('/', (req, res, next) => {
  Event.create(req.body)
    .then(event => {
      event.setUsers([req.user.id], {through: {isHost: true, isAttending: true}})
      return event
    })
    .then(event => {
      res.json(event)
    })
    .catch(next)
})

router.post('/user/:eventId', (req, res, next) => {
  Event.findById(req.params.eventId)
  .then(event => {
    event.addUsers([req.body.userId], {through: {isHost: false, isAttending: null}})
  })
  .then(() => {
   return User.findById(req.body.userId)
  })
  .then(user => {
    console.log(user)
    res.json(user)
  })
  .catch(next)
});

router.delete(`/user/:eventId`, (req, res, next) => {
  Event.findById(req.params.eventId)
  .then(event => {
    return event.removeUsers([req.body.userId])
  })
  .then(() => res.json(req.body.userId))
  .catch(next)
})
