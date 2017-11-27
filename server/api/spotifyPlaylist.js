const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-js')
const SpotifyApi = new SpotifyWebApi()
const { tokenRefresh } = require('../middleware/spotifyRefresh')
const { Playlist, PlaylistSong, Song } = require('../db/models')
const green = require('chalk').green
const red = require('chalk').red

module.exports = router

const filterUniqueTracks = (tracks, tracksCache = {}) => {
    const uniqueTracks = []
    let userCache = []

    tracks.forEach(track => {
        if (!tracksCache.hasOwnProperty(track.songId)) {
            uniqueTracks.push(track)
            userCache.push(track.userId)
            tracksCache[track.songId] = track
        }
    })
    return uniqueTracks
}
const filterUniqueArtists = (tracks) => {
    let artistCache = []
    let trackCache = []
    tracks.forEach(track => {
        if (artistCache.indexOf(track.spotifyArtistId) === -1) {
            artistCache.push(track.spotifyArtistId)
            trackCache.push(track)
        }
    })
    return trackCache
}

router.get('/refreshtoken/', tokenRefresh, (req, res, next) => {
    res.json(req.user.access)
})

router.get('/eventSongs/:eventId', (req, res, next) => {
    Playlist.find({ where: { eventId: req.params.eventId } })
        .then(playlist => {
            return PlaylistSong.findAll({
                where: { playlistId: playlist.id },
                order: [['priority', 'DESC']],
                limit: 50
            })
        })
        .then(songs => {
            return filterUniqueTracks(songs)
        })
        .then(tracks => {
            return Promise.all(tracks.map(track =>
                Song.findById(track.songId)
            ))
        })
        .then(songs => {
            let filteredSongs = filterUniqueArtists(songs).slice(0, 10)
            res.send(filteredSongs)
        })
        .catch(next)
})

router.put('/getPrioritizedSongs/:eventId', tokenRefresh, (req, res, next) => { // Should send back the uriArr, the spotUserId, and the spotPlaylistId
    const spotifyUserId = req.user.user.spotifyUserId
    const accessToken = req.user.access
    const limit = req.body.endParty ? 200 : 100
    const songAmount = req.body.endParty ? 100 : 30
    let spotifyPlaylistId;
    let tracksToPlay = []
    let uriArr = []
    SpotifyApi.setAccessToken(req.user.access)
    Playlist.findOne({ where: { eventId: req.params.eventId } }) //Gets PlaylistId
        .then(playlist => {
            spotifyPlaylistId = playlist.spotifyPlaylistId
            return PlaylistSong.findAll({ // Finds 100 of the top Prioritized songs in descending order
                where: { playlistId: playlist.id },
                order: [['priority', 'DESC']],
                limit: limit,
            })
        })
        .then(songs => {
            let tempSongs = songs.map(song => song.toJSON()) // Filters repeated songs and returns the top ten songs...
            return filterUniqueTracks(tempSongs).slice(0, songAmount)
        })
        .then(tracksToFetch => {
            return Promise.all(tracksToFetch.map(track => // Fetches the prioritized songs metadata, Model should be changed to carry their uri rather than their id...
                Song.findById(track.songId)
            ))
        })
        .then(tracksWithInfo => {
            let artistCache = []
            if (req.body.endParty) {
                tracksWithInfo.forEach(track => {
                    uriArr.push(`spotify:track:${track.spotifySongId}`)
                })
            } else {
                tracksWithInfo.forEach(track => {
                    if (artistCache.indexOf(track.spotifyArtistId) === -1) {
                        artistCache.push(track.spotifyArtistId)
                        uriArr.push(`spotify:track:${track.spotifySongId}`)
                    }
                }) // Formats the fetched songIds for spotify...

            }
            uriArr = uriArr.slice(0, songAmount)
            console.log(uriArr)
            res.json({
                uriArr,
                spotifyUserId,
                spotifyPlaylistId,
                accessToken
            })

        })
        .catch(next)
})

