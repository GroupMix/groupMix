import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import songs from './songs'
import events from './events'
import newEvent from './newEvent'
import users from './userList'

<<<<<<< HEAD
const reducer = combineReducers({user, newEvent, users})
=======
const reducer = combineReducers({user, events, newEvent, songs})
>>>>>>> master
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './songs'
export * from './events'
export * from './newEvent'
export * from './userList'
