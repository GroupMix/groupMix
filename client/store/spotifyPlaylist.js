import axios from 'axios'
// import history from '../history'
import { browserHistory } from 'react-router'
const SpotifyWebApi = require('spotify-web-api-js');
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

export const updateSpotifyPlaylist = (eventId) =>
  dispatch => {
    let newPlaylistData = {};
    axios.get(`/api/spotifyPlaylist/updatePlaylist/${eventId}`)
      .then(res => res.data)
      .then(data => {
        newPlaylistData = data
        SpotifyApi.setAccessToken(newPlaylistData.accessToken)
        return SpotifyApi.getPlaylistTracks
      })
      .then(playlistTracks => {
        return playlistTracks.map(item => item.track.uri)
      })
      .then(tracksToRemove => {
        SpotifyApi.removeTracksFromPlaylist(newPlaylistData.spotifyUserId,)
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
