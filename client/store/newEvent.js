import axios from 'axios'
// import history from '../history'
import { browserHistory } from 'react-router'

/* ACTION TYPES*/
const CREATE_EVENT = 'CREATE_EVENT'

/* INITIAL STATE */
const newEvent = {}

/* ACTION CREATORS */
const createEvent = event => ({ type: CREATE_EVENT, event })


/* THUNK CREATORS */
export const createNewEvent = (createdEvent) =>
  dispatch =>
    axios.post('/api/events', createdEvent)
      .then(res =>{
        console.log(res.data)
        dispatch(createEvent(res.data))})
      .catch(err => console.log(err))


/* REDUCER */
export default function (state = newEvent, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return action.event
    default:
      return state
  }
}
