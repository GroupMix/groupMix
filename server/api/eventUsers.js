const router = require('express').Router()
const { EventUser, Event } = require('../db/models')

module.exports = router

// Set RSVP status for particular EventUser
router.put('/rsvp/:eventId/:userId', (req, res, next) => {
  EventUser.find({
    where: {
      userId: req.params.userId,
      eventId: req.params.eventId
    }
  })
  .then(eventUser => eventUser.update({isAttending: req.body.rsvp}))
  .then(updatedEventUser => {
    res.json(updatedEventUser)
  })
  .catch(next)
})

// Check a User into an event
router.put('/checkin/:eventId', (req, res, next) => {
  EventUser.update({atEvent: true}, {where: {userId: req.user.id, eventId: req.params.eventId} })
  .then(guest => {
    console.log(guest, "Event Has Updated")
    res.send(guest)
  })
})

// Get events that a user hosted in descending order
router.get('/:userId/hosted', (req, res, next) => {
  EventUser.findAll({
    where: {
      userId: req.params.userId,
      isHost: true
    },
    order: [
      ['createdAt', 'DESC'],
    ]
  })
  .then(hostedEvents => {
    res.send(hostedEvents)
  })
  .catch(next)
})

// Checks id this particular user is the host of the party
router.get('/isHost/:eventId', (req, res, next) => {
  EventUser.findOne({
    where: {
      userId: req.user.id,
      eventId: req.params.eventId,
      isHost: true
    }
  })
  .then(host => {
    res.send(host.isHost)
  })
})

router.get('/hasCheckedIn/:eventId', (req, res, next) => {
  EventUser.findOne({
    where: {
      userId: req.user.id,
      eventId: req.params.eventId,
    }
  })
  .then(guest => {
    res.send(guest.isAttending)
  })
})

router.get('/:userId/events', (req, res, next) => {
  EventUser.findAll({
    where: {
      userId: req.params.userId
    },
    order: [
      ['createdAt', 'DESC'],
    ],
  })
  .then(userEvents => {
    res.send(userEvents)
  })
  .catch(next)
})
