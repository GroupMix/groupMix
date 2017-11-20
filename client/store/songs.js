import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_SONGS = 'GET_SONGS'
const REMOVE_SONG = 'REMOVE_SONGS'
const ADD_SONGS = 'ADD_SONGS'

/**
 * INITIAL STATE
 */
const defaultSongs = []

/**
 * ACTION CREATORS
 */
const getSongs = (songs) => ({type: GET_SONGS, songs})
const removeSong = (id) => ({type: REMOVE_SONG, id})
const addSongs = (songs) => ({type: ADD_SONGS, songs})

/**
 * THUNK CREATORS
 */
export const getSongsThunk = () =>
  dispatch =>
    axios.get('/api/songs')
      .then(res =>
        dispatch(getSongs(res.data || defaultSongs)))
      .catch(err => console.log(err))

export const addSongsThunk = (songs) =>
  dispatch =>
    axios.post('/api/songs', songs)
      .then(res => {
        dispatch(addSongs(res.data))
        return res.data.id
      })
      .then(songId => {

      })
      .catch(err => console.log(err))

export const removeSongThunk = (id) =>
  dispatch => {
  dispatch(removeSong(id))
    axios.delete(`/api/songs/${id}`)
      .catch(err => console.log(err))
  }
/**
 * REDUCER
 */

export default (songs = defaultSongs, action) => {
  switch (action.type) {
    case GET_SONGS:
      return action.songs;

    case REMOVE_SONG:
      return songs.filter(song => song.id !== action.id);

    case ADD_SONGS:
      return [...songs, action.songs];

    default:
      return songs;
  }
};
