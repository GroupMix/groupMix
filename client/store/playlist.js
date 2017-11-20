import axios from 'axios'
// import history from '../history'
import { browserHistory } from 'react-router'
const SpotifyWebApi = require('spotify-web-api-js');
const SpotifyApi = new SpotifyWebApi()

/* ACTION TYPES*/
const GET_PRIORITIZED_TRACKS = 'GET_PRIORITIZED_TRACKS'


/* INITIAL STATE */
const playlist = []

/* ACTION CREATORS */
const getPrioritizedTracks = tracks => ({ type: GET_PRIORITIZED_TRACKS, tracks })

/* THUNK CREATORS */
export const fetchPlaylist = (eventId, token, spotifyUserId) =>
  dispatch => {

    let tracksToPlay;
    let playlistId
    let uriArr = []
    let device;

    axios.get(`/api/prioritizedTracks/${eventId}`)
      .then(res => res.data)
      .then(prioritizedTracks => {
        SpotifyApi.setAccessToken(token)
        tracksToPlay = prioritizedTracks.slice(0, 9)
        dispatch(getPrioritizedTracks(prioritizedTracks))
        console.log(tracksToPlay)
      })
      .then(() => {
        tracksToPlay.forEach((track) => {
          let songId = axios.get(`/api/songs/${track.songId * 1}`)
            .then((res) => {
              uriArr.push(res.data.spotifySongId)
            })
        })
        return axios.get(`/api/events/playlist/${eventId}`)
      })
      .then((res) => {
        playlistId = res.data.spotifyPlaylistId
        // console.log(tracksToPlay, "tracks to be replaced")
        return SpotifyApi.getPlaylistTracks(spotifyUserId, playlistId)
        .then(playlistTracks => {
          let tracks = {
            "tracks": []
          }
          tracks.tracks = playlistTracks.items.map((item, i) => (
            { "positions":[i], "uri": item.track.uri}
          )
        )
        return tracks
        })
        .then(tracks => {
          // console.log(tracks, "Tracks object")
          SpotifyApi.replaceTracksInPlaylist(spotifyUserId, playlistId, tracks)
            .then(data => { console.log(data, "Data from replace") })
        })
      })
      .catch(err => console.log(err))
      // .then(()=>{
      //   // console.log(uriArr, 'uri array')
      //   return SpotifyApi.addTracksToPlaylist(spotifyUserId, playlistId, uriArr)
      // })
      // .then((play)=>{
      //   SpotifyApi.play({'context_uri': `spotify:user:${spotifyUserId}t:playlist:${playlistId}`})
      // })
      .catch(err => console.log(err))
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
