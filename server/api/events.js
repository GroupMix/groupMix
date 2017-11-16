const router = require('express').Router()
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



