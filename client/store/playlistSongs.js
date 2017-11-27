import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_PLAYLIST_SONGS = 'GET_PLAYLIST_SONGS'
const ADD_PLAYLIST_SONG = 'ADD_PLAYLIST_SONG'
const PRIORITIZE_SONGS = 'PRIORITIZE_SONGS'

/**
 * INITIAL STATE
 */
const defaultSongs = []

/**
 * ACTION CREATORS
 */
const getPlaylistSongs = (songs) => ({ type: GET_PLAYLIST_SONGS, songs })
const addPlaylistSong = (song) => ({ type: ADD_PLAYLIST_SONG, song })
const myPrioritizeSongs = () => ({ type: PRIORITIZE_SONGS })

/**
 * THUNK CREATORS
 */

 // fetches all the songs belonging to a particular playlist
export const fetchPlaylistSongs = (eventId) =>
dispatch => {
    axios.get(`/api/spotifyPlaylist/eventSongs/${eventId}`)
    .then(res => res.data)
    .then(tracks => {
      dispatch(getPlaylistSongs(tracks))
    })
    .catch(err => console.log(err))
  }

export const addPlaylistSongThunk = (song) =>
  dispatch =>
    axios.post('/api/playlistSongs', song)
      .then(res => {
        dispatch(addPlaylistSong(res.data))
      })
      .catch(err => console.log(err))

export const prioritizeSongs = (eventId) =>
  dispatch => {
    axios.get(`/api/playlistSongs/prioritize/${eventId}`)
      .then(res => {
        dispatch(myPrioritizeSongs())
      })
      .catch(err => console.log(err))
  }
export default (playlistSongs = defaultSongs, action) => {
  switch (action.type) {
    case ADD_PLAYLIST_SONG:
      return [...playlistSongs, action.song];
    case PRIORITIZE_SONGS:
      return playlistSongs;
    case  GET_PLAYLIST_SONGS:
      return action.songs
    default:
      return playlistSongs;
  }
};
