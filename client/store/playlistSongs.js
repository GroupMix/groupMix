import axios from 'axios'

const ADD_PLAYLIST_SONG = 'ADD_PLAYLIST_SONG'

export const addPlaylistSongs = (songs) => ({ type: ADD_PLAYLIST_SONG, songs})

export default(myPlaylistSongs = [], action) {
  switch (action.type) {

    case ADD_PLAYLIST_SONG: {

    }

  }
}


