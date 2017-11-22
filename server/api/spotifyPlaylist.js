const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-js')
const SpotifyApi = new SpotifyWebApi()
const { Playlist, PlaylistSong, Song } = require('../db/models')

module.exports = router

router.get('/updatePlaylist/:eventId', (req, res, next) => {
    SpotifyApi.setAccessToken(req.user.access)
    let tracksToPlay = []
    let tracksCache = {}

    Playlist.findOne({ where: { eventId: req.params.eventId } })
        .then(playlist => {
            return PlaylistSong.findAll({
                where: { playlistId: playlist.id },
                order: [['priority', 'DESC']],
                limit: 100,
            })
        })
        .then(songs => {
            let tempSongs = songs.map(song => song.toJSON())
            tempSongs.forEach(song => {
                // if()
            })
            tracksToPlay = tracksToPlay.slice(0, 10)
            res.json(tracksToPlay)
        })
        .catch(next)
})

// Cache Songs that where already passed by and push only the ones we haven't passed by
// Whatever 