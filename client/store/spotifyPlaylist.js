import axios from 'axios'
// import history from '../history'
import { browserHistory } from 'react-router'
import SpotifyWebApi from 'spotify-web-api-js'
const SpotifyApi = new SpotifyWebApi()
import { ERROR } from 'socket.io-parser';
import { errorState } from './errorHandler'
import { fetchPlaylistSongs } from './playlistSongs'
import socket from '../socket'

// Helper Functions
const setSpotifyToken = () => {
  return axios.get('/api/spotifyPlaylist/refreshtoken')
    .then(res => res.data)
    .then(token => {
      SpotifyApi.setAccessToken(token)
    })
}

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

        setSpotifyToken()
          .then(() => {
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
          .then(() => {
            console.log('Spotify Updated')
            dispatch(fetchPlaylistSongs(eventId))
            socket.emit(`UpdateEvents`, eventId)
            // dispatch(fetchPlaylistSongs(eventId))

          })
          .catch(err => console.log(err))
      })
  }

export const startSpotifyPlaylist = (spotifyUri) =>
  dispatch => {
    setSpotifyToken()
      .then(() => {
        SpotifyApi.getMyDevices()
          .then(data => {
            console.log(data, 'My devices')
            SpotifyApi.play({ 'device_id': data.devices[0].id, 'context_uri': spotifyUri })
          })
          .catch(err => {
            dispatch(errorState(new Error("Please Open Spotify on your device before trying to start your Playlist!")))
            dispatch(pollingCurrentSong(false))
            console.log(err)
          })
      })
      .catch(err => console.log(err, 'error'))
  }

export const resumeSpotifyPlaylist = () =>
dispatch => {
  let currentTrackUri;
  setSpotifyToken()
    .then(() => {
      return SpotifyApi.getMyCurrentPlayingTrack()
    })
    .then((playingSong) => {
      console.log('PLAYING SONGGG FOR RESUME', playingSong)
      currentTrackUri = playingSong.item.uri
      SpotifyApi.getMyDevices()
        .then(data => {
          console.log(data, 'My devices')
          SpotifyApi.play({ 'device_id': data.devices[0].id })
        })
        .catch(err => {
          dispatch(errorState(new Error("Please Open Spotify on your device before trying to start your Playlist!")))
          dispatch(pollingCurrentSong(false))
          console.log(err)
        })
    })
    .catch(err => console.log(err, 'error'))
}


export const pauseSpotifyPlaylist = () =>
dispatch => {
  setSpotifyToken()
  .then(() => {
    return SpotifyApi.getMyDevices()
  })
    .then(data => {
      SpotifyApi.pause({ 'device_id': data.devices[0].id })
      dispatch(pollingCurrentSong(false))
  })
  .catch(err => console.error(err));
}

let interval
export const pollingCurrentSong = (poll, eventId) =>
dispatch => {
  let currentSongId;
    // console.log('polling')
    let error;
    if (poll) {
      interval = setInterval(() => {
        setSpotifyToken()
          .then(() => {
            return SpotifyApi.getMyCurrentPlayingTrack()
              .then(track => {
                // console.log('polling')
                console.log('CURRENT SONG', currentSongId)
                if (track.is_playing) {

                  if (track.item.id !== currentSongId){
                    dispatch(updateSpotifyPlaylist(eventId))
                    currentSongId = track.item.id
                  }

                  axios.put(`/api/playlistSongs/markAsPlayed/${track.item.id}`)
                } else {
                  console.log('no song playing')
                  // dispatch(updateSpotifyPlaylist(eventId))
                  //   .then(() => {
                      // dispatch(startSpotifyPlaylist())
                    // })
                }
              })
          })
      }, 6000)
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
