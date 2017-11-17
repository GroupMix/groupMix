import axios from 'axios'
import history from '../history'
import { browserHistory } from 'react-router'

/* ACTION TYPES*/
const CREATE_EVENT = 'CREATE_EVENT'

/* INITIAL STATE */
const newEvent = {
  newEvent: {}
}

/* ACTION CREATORS */
const createEvent = newEvent => ({ type: CREATE_EVENT, newEvent })


/* THUNK CREATORS */
export const createNewEvent = (name, date, time, city, state, zip, address, type) =>
  dispatch =>
    axios.post('/api/events', {name, date, time, city, state, zip, address, type})
      .then(res =>{
        console.log(res.data)
        dispatch(createEvent(res.data))})
        //history.push('/eventgenres')
      .catch(err => console.log(err))


/* REDUCER */
export default function (state = newEvent, action) {

  switch (action.type) {
    case CREATE_EVENT:
      return Object.assign({}, state, { newEvent: action.newEvent })
    default:
      return state
  }
}
