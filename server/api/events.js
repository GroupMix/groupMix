const router = require('express').Router()
const { Event, User } = require('../db/models')

module.exports = router

// get all events associated with this user
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(user => user.getEvents())
  .then(events => res.json(events))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Event.create(req.body)
    .then(event => {
      // event.setUser([req.body.hostId], {through: {isHost: true}})
      res.json(event)
    })
    .catch(next)
})


