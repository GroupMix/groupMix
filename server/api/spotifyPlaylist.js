const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-js')
const SpotifyApi = new SpotifyWebApi()
const { Playlist, PlaylistSong, Song } = require('../db/models')

module.exports = router

const filterUniqueTracks = (tracks, tracksCache = {}) => {
    const uniqueTracks = []
    tracks.forEach(track => {
        if (!tracksCache.hasOwnProperty(track.songId)) {
            console.log(track.songId)
            uniqueTracks.push(track)
            tracksCache[track.songId] = track
        }
    })
    return uniqueTracks
}

router.get('/updatePlaylist/:eventId', (req, res, next) => {
    SpotifyApi.setAccessToken(req.user.access)
    let tracksToPlay = []
    let uriArr =[]
    // SpotifyApi.getMyDevices()
    // .then(devices => {
    //     console.log(devices, 'my devices')
    // })
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
           return filterUniqueTracks(tempSongs).slice(0, 10)
        })
        .then(tracksToFetch => {
            return Promise.all(tracksToFetch.map(track =>
                Song.findById(track.songId)
            ))
        })
        .then(tracksWithInfo => {
            uriArr = tracksWithInfo.map(track => `spotify:track:${track.spotifySongId}`)
            console.log(uriArr)
            res.send()
        })
        .catch(next)
})
