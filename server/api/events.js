const router = require('express').Router()
<<<<<<< HEAD
const { Event, User } = require('../db/models')

module.exports = router

// get all events associated with this user
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
  .then(user => user.getEvents())
  .then(events => res.json(events))
  .catch(next)
})
=======
const { Event } = require('../db/models')
const { User } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Event.create(req.body)
    .then(event => {
      // event.setUser([req.body.hostId], {through: {isHost: true}})
      res.json(event)
    })
    .catch(next)
})



>>>>>>> fbe15dbdbdfbb877f8f92643db989504e68dec96
