import axios from 'axios'
// import history from '../history'
import { browserHistory } from 'react-router'

/* ACTION TYPES*/
const CREATE_EVENT = 'CREATE_EVENT'
const GET_EVENT = 'GET_EVENT'
/* INITIAL STATE */
const newEvent = {}

/* ACTION CREATORS */
const createEvent = event => ({ type: CREATE_EVENT, event })
const getEvent = event => ({ type: GET_EVENT, event })

/* THUNK CREATORS */
export const createNewEvent = (createdEvent, history) =>
  dispatch =>
    axios.post('/api/events', createdEvent)
      .then(res => res.data)
      .then(createdEvent => {
        dispatch(createEvent(createdEvent))
        history.push(`${createdEvent.id}/users/invite`)
      })
      .catch(err => console.log(err))

export const fetchEvent = (eventId) =>
  dispatch =>
    axios.get(`/api/events/${eventId}`)
      .then(res => res.data)
      .then(event => dispatch(getEvent(event)))
      .catch(err => console.log(err))

/* REDUCER */
export default function (state = newEvent, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return action.event
      case GET_EVENT:
      return action.event
    default:
      return state
  }
}
