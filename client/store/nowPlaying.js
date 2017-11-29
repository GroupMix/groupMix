

const CURRENTLY_PLAYING = 'CURRENTLY_PLAYING';

export const getCurrentSong = (currentSong) => {
    return {
        type: CURRENTLY_PLAYING,
        currentSong
    }
}


// reducer

const reducerMethods = {
    CURRENTLY_PLAYING(state, action) {
        return action.currentSong
    }
}


export default (state = {}, action) => {
    if (reducerMethods[action.type]) return reducerMethods[action.type](state, action)
    return state
} 