import axios from 'axios'
/**
 * ACTION TYPES
 */
// const GET_SONGS = 'GET_SONGS'
// const REMOVE_SONG = 'REMOVE_SONGS'
const ADD_PLAYLIST_SONG = 'ADD_PLAYLIST_SONG'

/**
 * INITIAL STATE
 */
const defaultSongs = []

/**
 * ACTION CREATORS
 */
// const getSongs = (songs) => ({type: GET_SONGS, songs})
// const removeSong = (id) => ({type: REMOVE_SONG, id})
const addPlaylistSong = (song) => ({type: ADD_PLAYLIST_SONG, song})

/**
 * THUNK CREATORS
 */
// export const getSongsThunk = () =>
//   dispatch =>
//     axios.get('/api/songs')
//       .then(res =>
//         dispatch(getSongs(res.data || defaultSongs)))
//       .catch(err => console.log(err))

export const addPlaylistSongThunk = (song) =>
  dispatch =>
    axios.post('/api/playlistSongs', song)
      .then(res => {
        dispatch(addPlaylistSong(res.data))
      })
      .catch(err => console.log(err))

// export const removeSongThunk = (id) =>
//   dispatch => {
//   dispatch(removeSong(id))
//     axios.delete(`/api/songs/${id}`)
//       .catch(err => console.log(err))
//   }
/**
 * REDUCER
 */

export default (playlistSongs = defaultSongs, action) => {
  switch (action.type) {
    // case GET_SONGS:
    //   return action.songs;

    // case REMOVE_SONG:
    //   return songs.filter(song => song.id !== action.id);

    case ADD_PLAYLIST_SONG:
      return [...playlistSongs, action.song];

    default:
      return playlistSongs;
  }
};
