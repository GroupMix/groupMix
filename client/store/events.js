import axios from 'axios';

// ACTION TYPES
const GET_EVENTS = 'GET_EVENTS';
const SET_RSVP = 'SET_RSVP';

// ACTION CREATORS
const getEvents = (events) => ({ type: GET_EVENTS, events })
const updateRsvp = (eventId, userId, rsvp) => ({ type: SET_RSVP, eventId, userId, rsvp })

// THUNKS
export const fetchUserEvents = (userId) => dispatch => {
  axios.get(`/api/events/${userId}`)
  .then(res => dispatch(getEvents(res.data)))
}

export const setRsvp = (eventId, userId, rsvp) => dispatch => {
  axios.put(`/api/eventUsers/rsvp/${eventId}/${userId}`, {rsvp})
  .then(res => dispatch(updateRsvp(res.data.eventId, res.data.userId, res.data.isAttending)))
}

// REDUCER
export default function (events = [], action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.events

    case SET_RSVP:
      return events.map(event => {
        if (action.eventId === event.id) {
          event.eventUser.isAttending = action.rsvp;
        }
        return event;
      })

    default: return events
  }
}
