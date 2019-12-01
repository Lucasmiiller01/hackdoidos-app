export const types = {
    ASYNC_REQUEST_MY_PROFILE: 'ASYNC_REQUEST_MY_PROFILE',
    REQUEST_MY_PROFILE_SUCCESS: 'REQUEST_MY_PROFILE_SUCCESS',
    REQUEST_MY_PROFILE_ERROR: 'REQUEST_MY_PROFILE_ERROR',

}

const INITIAL_STATE = {
    data: null,
    loaded: false,
    error: false,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.REQUEST_MY_PROFILE_SUCCESS:
            return { ...state, loaded: true, error: false, data: action.payload };
        case types.REQUEST_MY_PROFILE_ERROR:
            return { ...state, loaded: true, error: true,data: null };
 
        default:
            return { ...state }
    }
}

export const loadUserProfile = () => ({ type: types.ASYNC_REQUEST_MY_PROFILE });
