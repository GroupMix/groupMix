import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import songs from './songs'
import events from './events'
import newEvent from './newEvent'
import users from './userList'
import invitedUsers from './guestList'
import eventUsers from './eventUsers'
import playlist from './playlist'
import spotifyPlaylist from './spotifyPlaylist'
import playlistSongs from './playlistSongs'

const reducer = combineReducers({
  user,
  songs,
  users,
  events,
  playlist,
  newEvent,
  eventUsers,
  invitedUsers,
  playlistSongs,
  spotifyPlaylist,
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './songs'
export * from './events'
export * from './playlist'
export * from './newEvent'
export * from './userList'
export * from './guestList'
export * from './eventUsers'
export * from './playlistSongs'
export * from './spotifyPlaylist'

