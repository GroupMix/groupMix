const router = require('express').Router();
const { PlaylistSong } = require('/../db/models');

module.exports = router

// router.post('/', (req, res, next) => {
//   PlaylistSong.findOrCreate(req.body)
//     .then(song => {
//       song.increment('requests', {by: 1})
//       res.status(201).json(song)}
//   )
//     .catch(next);
// });

router.post('/', (req, res, next) => {
  PlaylistSong.findOrCreate(req.body)
    .then(song => {
      song.increment('requests', {by: 1})
      res.status(201).json(song)}
  )
    .catch(next);
});

router.get('/:playlistId/:songId', (req, res, next) => {
  let playId = req.params.playlistId;
  let songId = req.params.songId;
  PlaylistSong.findAll({where: { playlistId: playId, songId: songId }})
    .then(song => res.status(201).send(song))
    .catch(next);
});

router.get('/:playlistId', (req, res, next) => {
  let id = req.params.playlistId;
  PlaylistSong.findAll({where: { playlistId: id }})
    .then(song => res.status(201).send(song))
    .catch(next);
});

router.delete('/:playlistId/:songId', (req, res, next) => {
  let playId = req.params.playlistId;
  let songId = req.params.songId;

  PlaylistSong.findAll({where: { playlistId: playId, songId: songId }})
    .then(song => song.destroy())
    .then(() => res.status(204).end())
    .catch(next);
});

router.put('/:playlistId/:songId', (req, res, next) => {
  let playId = req.params.playlistId;
  let songId = req.params.songId;
  PlaylistSong.findAll({where: { playlistId: playId, songId: songId }})
    .then(song => song.update({priority: req.body}))
    .then(song => res.status(201).send(song))
    .catch(next);
});
