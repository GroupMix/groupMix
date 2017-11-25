import axios from 'axios'
// import history from '../history'
import { browserHistory } from 'react-router'
import SpotifyWebApi from 'spotify-web-api-js'
const SpotifyApi = new SpotifyWebApi()

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

    return axios.put(`/api/spotifyPlaylist/getPrioritizedSongs/${eventId}`, {endParty})
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

export const startSpotifyPlaylist = (spotifyUri) => {
  axios.get('/api/spotifyPlaylist/play')
    .then(res => res.data)
    .then(token => {
      SpotifyApi.setAccessToken(token)
      SpotifyApi.play({ 'context_uri': spotifyUri })
    })
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
