const router = require('express').Router()
const { Event, User } = require('../db/models')

module.exports = router

// get all events associated with this user
router.get('/:userId', (req, res, next) => {
  Event.findAll({
    include: [
      {
        model: User,
        where: {
          id: req.params.userId
        },
    }
    ]
  })
    .then(events => res.json(events))
    .catch(next)

// magic method not working
})
