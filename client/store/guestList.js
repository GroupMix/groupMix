import axios from 'axios'
import history from '../history'
import { browserHistory } from 'react-router'

/* ACTION TYPES*/
const GET_INVITED_USERS = 'GET_INVITED_USERS'
const INVITE_USER = 'INVITE_USER'
const UNINVITE_USER = 'UNINVITE_USER'
/* INITIAL STATE */
const invitedUsers = []

/* ACTION CREATORS */
const getInvitedUsers = users => ({ type: GET_INVITED_USERS, users })
const inviteUser = user => ({ type: INVITE_USER, user })
const uninviteUser = userId => ({ type: UNINVITE_USER, userId })
/* THUNK CREATORS */

export const removeUserInvite = (eventId, userId) =>
    dispatch =>
        axios.put(`/api/events/user/${eventId}`, {userId})
        .then(res => res.data)
        .then(uninvitedUserId => {
            dispatch(uninviteUser(uninvitedUserId))
        })
        .catch(err => console.log(err))

export const fetchInvitedUsers = (eventId) =>
    (dispatch) =>
        axios.get(`/api/events/users/${eventId}`)
            .then(res => {
                dispatch(getInvitedUsers(res.data))
            })
            .catch(err => console.log(err))

export const postInvitedUser = (eventId, userId) =>
    (dispatch) => {
        return axios.post(`/api/events/user/${eventId}`, { userId })
            .then(res => res.data)
            .then(invitedUser => dispatch(inviteUser(invitedUser)))
    }

/* REDUCER */
export default function (state = invitedUsers, action) {
    switch (action.type) {
        case GET_INVITED_USERS:
            return action.users
        case INVITE_USER:
            return [...state, action.user]
        case UNINVITE_USER:
            return state.filter(user => user.id !== action.userId)
        default:
            return state
    }
}
