import axios from 'axios'
// import history from '../history'
import { browserHistory } from 'react-router'

/* ACTION TYPES*/
const GET_PRIORITIZED_TRACKS = 'GET_PRIORITIZED_TRACKS'

/* INITIAL STATE */
const playlist = []

/* ACTION CREATORS */
const getPrioritizedTracks = tracks => ({ type: GET_PRIORITIZED_TRACKS, tracks })

/* THUNK CREATORS */
export const fetchPlaylist = (eventId) =>
  dispatch =>
    axios.get(`/api/prioritizedTracks/${eventId}`)
      .then(res => res.data)
      .then(prioritizedTracks => {
        dispatch(getPrioritizedTracks(prioritizedTracks))
      })
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = playlist, action) {
  switch (action.type) {
    case GET_PRIORITIZED_TRACKS:
      return action.tracks
    default:
      return state
  }
}
