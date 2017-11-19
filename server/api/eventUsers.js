const router = require('express').Router()
const { EventUser } = require('../db/models')

module.exports = router

// Set RSVP status for particular EventUser
router.put('/rsvp/:eventId/:userId', (req, res, next) => {
  console.log('REQ BODY', req.body)
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

router.get('/:userId/events', (req, res, next) => {
  EventUser.findAll({
    where: {
      userId: req.params.userId
    },
    order: [
      ['createdAt', 'DESC'],
    ]
  })
  .then(userEvents => {
    res.send(userEvents)
  })
  .catch(next)
})
