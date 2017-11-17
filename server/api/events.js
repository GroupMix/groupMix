const router = require('express').Router()
const { Event } = require('../db/models')
const { User } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {

  Event.create(req.body)
    .then(event => {
      console.log("req user", req.user)
      event.setUsers([3], {through: {isHost: true}})
      return event
    })
    .then(event => {

      res.json(event)
    })
    .catch(next)
})



