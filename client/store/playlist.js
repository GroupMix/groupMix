import axios from 'axios'
// import history from '../history'
import { browserHistory } from 'react-router'
const SpotifyWebApi = require('spotify-web-api-js');
const SpotifyApi = new SpotifyWebApi()

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

/* ACTION TYPES*/
const GET_PRIORITIZED_TRACKS = 'GET_PRIORITIZED_TRACKS'


/* INITIAL STATE */
const playlist = []

/* ACTION CREATORS */
const getPrioritizedTracks = tracks => ({ type: GET_PRIORITIZED_TRACKS, tracks })

/* THUNK CREATORS */
// export const updateSpotifyPlaylist = (eventId) => {
//   axios.get('/api/prioritized')
// }

export const deletePlaylistSongs = (eventId) =>
  dispatch => {
    return axios.delete(`/api/playlistSongs/clearPlSongs/${+eventId}`)
    .then(res => res.data)
    .then(deletedSongs => console.log('songs deleted'))
  }

/* REDUCER */
export default function (state = playlist, action) {
  switch (action.type) {
    case GET_PRIORITIZED_TRACKS:
      return action.tracks
    default:
      return state
  }
}
