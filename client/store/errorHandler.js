

//Action

const ERROR_STATE = 'ERROR_STATE'


// Action Creator

export const errorState = (error) =>  ({ type: ERROR_STATE, error })

// Reducer

const reducerMethods = {
    ERROR_STATE(state, action) {
        return action.error;
    }
}

export default function (state = {}, action) {
    if (reducerMethods[action.type]) return reducerMethods[action.type](state, action)
    return state
}
