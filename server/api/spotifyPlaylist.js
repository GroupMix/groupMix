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
    tracks.forEach(track => {
        if (!tracksCache.hasOwnProperty(track.songId)) {
            uniqueTracks.push(track)
            tracksCache[track.songId] = track
        }
    })
    return uniqueTracks
}

router.get('/updatePlaylist/:eventId', tokenRefresh, (req, res, next) => { // Should send back the uriArr, the spotUserId, and the spotPlaylistId
    const spotifyUserId = req.user.user.spotifyUserId
    const accessToken = req.user.access
    let spotifyPlaylistId;
    let tracksToPlay = []
    let uriArr =[]

    SpotifyApi.setAccessToken(req.user.access)
    Playlist.findOne({ where: { eventId: req.params.eventId } }) //Gets PlaylistId
        .then(playlist => {
            spotifyPlaylistId = playlist.spotifyPlaylistId
            return PlaylistSong.findAll({ // Finds 100 of the top Prioritized songs in descending order
                where: { playlistId: playlist.id },
                order: [['priority', 'DESC']],
                limit: 100,
            })
        })
        .then(songs => {
            let tempSongs = songs.map(song => song.toJSON()) // Filters repeated songs and returns the top ten songs...
           return filterUniqueTracks(tempSongs).slice(0, 10)
        })
        .then(tracksToFetch => {
            return Promise.all(tracksToFetch.map(track => // Fetches the prioritized songs metadata, Model should be changed to carry their uri rather than their id...
                Song.findById(track.songId)
            ))
        })
        .then(tracksWithInfo => {
            uriArr = tracksWithInfo.map(track => `spotify:track:${track.spotifySongId}`) // Formats the fetched songIds for spotify... 
            res.json({
                uriArr,
                spotifyUserId,
                spotifyPlaylistId,
                accessToken
            })
           
        })
        .catch(next)
})
