const router = require('express').Router();
const { Song } = require('/../db/models');

module.exports = router

router.post('/', (req, res, next) => {
  Song.findOrCreate(req.body)
    .then(songs => res.status(201).json(songs))
    .catch(next);
});

router.get('/:songId', (req, res, next) => {
  Song.findById(req.params.songId)
    .then(song => res.status(201).send(song))
    .catch(next);
});

router.delete('/:songId', (req, res, next) => {
  Song.findById(req.params.songId)
    .then(song => song.destroy())
    .then(() => res.status(204).end())
    .catch(next);
});
