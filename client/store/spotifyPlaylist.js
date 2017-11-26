import axios from 'axios'
// import history from '../history'
import { browserHistory } from 'react-router'
import SpotifyWebApi from 'spotify-web-api-js'
const SpotifyApi = new SpotifyWebApi()
import { ERROR } from 'socket.io-parser';
import { errorState } from './errorHandler'

/* ACTION TYPES*/
const GET_SPOTIFY_PLAYLIST = 'GET_SPOTIFY_PLAYLIST'


/* INITIAL STATE */
const defaultSpotifyPlaylist = []

/* ACTION CREATORS */
const getPlaylist = spotifyPlaylist => ({ type: GET_SPOTIFY_PLAYLIST, spotifyPlaylist })

/* THUNK CREATORS */
export const fetchSpotifyPlaylist = (eventId) =>
  dispatch => {
    axios.get(`/api/events/playlist/${eventId}`)
      .then(res => dispatch(getPlaylist(res.data)))
      .catch(err => console.log(err))
  }

export const updateSpotifyPlaylist = (eventId, endParty) =>
  dispatch => {
    let newPlaylistData = {};
    let spotifyUserId;
    let spotifyPlaylistId;
    let tracksToAdd;

    return axios.put(`/api/spotifyPlaylist/getPrioritizedSongs/${eventId}`, { endParty })
      .then(res => res.data)
      .then(data => {
        newPlaylistData = data
        spotifyUserId = newPlaylistData.spotifyUserId
        spotifyPlaylistId = newPlaylistData.spotifyPlaylistId
        tracksToAdd = newPlaylistData.uriArr

        SpotifyApi.setAccessToken(newPlaylistData.accessToken)
        return SpotifyApi.getPlaylistTracks(spotifyUserId, spotifyPlaylistId)
      })
      .then(playlistTracks => {
        return playlistTracks.items.map(item => item.track.uri)
      })
      .then(tracksToRemove => {
        return SpotifyApi.removeTracksFromPlaylist(spotifyUserId, spotifyPlaylistId, tracksToRemove)
      })
      .then(() => {
        return SpotifyApi.addTracksToPlaylist(spotifyUserId, newPlaylistData.spotifyPlaylistId, tracksToAdd)
      })
      .then(() => console.log('Spotify Updated'))
      .catch(err => console.log(err))
  }

export const startSpotifyPlaylist = (spotifyUri) =>
  dispatch => {
    axios.get('/api/spotifyPlaylist/refreshtoken')
      .then(res => res.data)
      .then(token => {
        SpotifyApi.setAccessToken(token)
        SpotifyApi.getMyDevices()
          .then(data => {
            console.log(data, 'My devices')
            SpotifyApi.play({ 'device_id': data.devices[0].id, 'context_uri': spotifyUri })
          })
          .catch(err => {
            dispatch(errorState(new Error("Please Open Spotify on your device before trying to start your Playlist!")))
            console.log(err)
          })
      })
      .catch(err => console.log(err, 'error'))
  }

let interval
export const pollingCurrentSong = (poll) => {
  console.log('polling')
  let error;
  if (poll) {
    interval = setInterval(() => {
      return axios.get('/api/spotifyPlaylist/refreshtoken')
        .then(res => {
          let token = res.data
          SpotifyApi.setAccessToken(token)
          return SpotifyApi.getMyCurrentPlayingTrack()
            .then(track => {
              console.log('polling', track)
              if (track.is_playing) {
                console.log(track.item.name, 'has played')
                axios.put(`/api/playlistSongs/markAsPlayed/${track.item.id}`)
              }
            })
        })
        .catch(err => console.log(err, 'err'))
    }, 30000)
  }
  if (!poll) {
    console.log(interval, 'stopped pollling')
    clearInterval(interval)
  }
}

/* REDUCER */
export default function (state = defaultSpotifyPlaylist, action) {
  switch (action.type) {
    case GET_SPOTIFY_PLAYLIST:
      return action.spotifyPlaylist
    default:
      return state
  }
}
