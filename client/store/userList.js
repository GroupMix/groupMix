import axios from 'axios';

// Actions
const GET_ALL_USERS = 'GET_ALL_USERS'
const HIDE_USER = 'HIDE_USER'
const FILTER_USER = 'FILTER_USER'
// These actions are used to strictly for admins
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER = 'UPDATE_USER'

// Action Creators
export const getAllUsers = (users) => {
    return {
        type: GET_ALL_USERS,
        users
    }
}

export const hideUser = (userId) => {
    return {
        type: HIDE_USER,
        userId,
    }
}

export const filterUser = (name) => {
    return {
        type: FILTER_USER,
        name
    }
}

// Reducers
const reducerMethods = {
    GET_ALL_USERS: (state, action) => {
        return action.users
    },
    HIDE_USER: (state, action) => {
        return state.filter(user => user.id !== action.userId)
    },
    FILTER_USER: (state, action) => {
        return state.filter(user => user.name.includes(action.name))
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
