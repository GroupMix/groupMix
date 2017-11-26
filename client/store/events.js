import axios from 'axios';
const SpotifyWebApi = require('spotify-web-api-js');
const SpotifyApi = new SpotifyWebApi()

// ACTION TYPES
const GET_EVENTS = 'GET_EVENTS';
const SET_RSVP = 'SET_RSVP';
const UPDATE_EVENT = 'UPDATE_EVENT';

// ACTION CREATORS
const getEvents = (events) => ({ type: GET_EVENTS, events })
const updateRsvp = (eventId, userId, rsvp) => ({ type: SET_RSVP, eventId, userId, rsvp })
const updateEvent = (event) => ({ type: UPDATE_EVENT, event })

// THUNKS
export const fetchUserEvents = (userId) => dispatch => {
  axios.get(`/api/users/${userId}/events`)
    .then(res => res.data)
    .then(events => {
      dispatch(getEvents(events))
    })
}

export const setRsvp = (eventId, userId, rsvp) => dispatch => {
  axios.put(`/api/eventUsers/rsvp/${eventId}/${userId}`, { rsvp })
    .then(res => dispatch(updateRsvp(res.data.eventId, res.data.userId, res.data.isAttending)))
}

export const cancelEvent = (eventId, userId) =>
  dispatch =>
    axios.delete(`/api/events/${eventId}`)
      .then(() => dispatch(fetchUserEvents(userId)))
      .catch(err => console.log(err))

export const editEvent = (eventId, event, history) =>
  dispatch => {
    axios.put(`/api/events/${eventId}`, event)
      .then(res => res.data)
      .then(updatedEvent => {
        dispatch(updateEvent(updatedEvent))
        history.push(`/eventList`)
      })
      .catch(err => console.log(err))
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

    case UPDATE_EVENT:
      return events.map(event => {
        if (action.event.id === event.id) {
          return action.event
        }
        return event;
      })

    default: return events
  }
}
