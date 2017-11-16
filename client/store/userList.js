import axios from 'axios';

// Actions
const GET_ALL_USERS = 'GET_ALL_USERS'

// These actions are used to strictly for admins
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'

// Action Creators
const getAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        users
    }
}

// Reducers
const reducerMethods = {
    GET_ALL_USERS: (state, action) => {
        return action.users
    }
}

export default function(state = [], action) {
    if (reducerMethods[action.type]) return reducerMethods[action.type](state, action)
    return state
}

// THUNKS
export const fetchAllUsers = () => (dispatch) => {
    return axios.get('/api/users/')
    .then(res => res.data)
    .then(users => {
        dispatch(getAllUsers(users))
    })
}
