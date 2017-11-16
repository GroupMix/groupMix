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

