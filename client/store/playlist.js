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

// export const fetchPlaylist = (eventId, token, spotifyUserId) =>
//   dispatch => {
//     let tracksToPlay
//     let playlistId
//     let uriArr = []

//     axios.get(`/api/prioritizedTracks/${eventId}`)
//       .then(res => res.data)
//       .then(prioritizedTracks => {
//         SpotifyApi.setAccessToken(token)
//         tracksToPlay = filterUniqueTracks(prioritizedTracks).slice(0, 9)
//         dispatch(getPrioritizedTracks(tracksToPlay))
//       })
//       .then(() => {
//         tracksToPlay.forEach((track) => {
//           axios.get(`/api/songs/${+track.songId}`)
//             .then((res) => {
//               uriArr.push(res.data.spotifySongId)
//             })
//         })
//         return axios.get(`/api/events/playlist/${eventId}`)
//       })
//       .then((res) => {
//         playlistId = res.data.spotifyPlaylistId
//         return SpotifyApi.getPlaylistTracks(spotifyUserId, playlistId)
//           .then(playlistTracks => {
//             return playlistTracks.items.map((item, i) => item.track.uri)
//           })
//           .then(tracks => {
//             return SpotifyApi.removeTracksFromPlaylist(spotifyUserId, playlistId, tracks)
//           })
//           .then(() => {
//             let uris = uriArr.map(uri => `spotify:track:${uri}`)
//             console.log(uris)
//             return SpotifyApi.addTracksToPlaylist(spotifyUserId, playlistId, uris)
//           })
//           .then((play) => {
//             SpotifyApi.getMyDevices()
//               .then(myDevices => {
//                 SpotifyApi.play({ 'context_uri': `spotify:user:${spotifyUserId}:playlist:${playlistId}` })
//                 .then(message => {
//                   console.log(message, "Playlist now playing")
//                 })
//               })
//           })
//       })
//       .catch(err => console.log(err))
//   }
/* REDUCER */
export default function (state = playlist, action) {
  switch (action.type) {
    case GET_PRIORITIZED_TRACKS:
      return action.tracks
    default:
      return state
  }
}
