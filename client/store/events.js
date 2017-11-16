import axios from 'axios';

// ACTION TYPES
const GET_EVENTS = 'GET_EVENTS';

// ACTION CREATORS
const getEvents = (events) => ({ type: GET_EVENTS, events })

// THUNKS
export const fetchUserEvents = (userId) => dispatch => {
  axios.get(`/api/events/${userId}`)
  .then(res => dispatch(getEvents(res.data)))
  console.log('FETCH THUNK')
}

// REDUCER
export default function (events = [], action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events

    default: return events
  }
}
