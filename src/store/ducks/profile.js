export const types = {
    ASYNC_REQUEST_MY_PROFILE: 'ASYNC_REQUEST_MY_PROFILE',
    REQUEST_MY_PROFILE_SUCCESS: 'REQUEST_MY_PROFILE_SUCCESS',
    REQUEST_MY_PROFILE_ERROR: 'REQUEST_MY_PROFILE_ERROR',

    TOGGLE_MODAL_CHANGE_PASSWORD: 'TOGGLE_MODAL_CHANGE_PASSWORD',
    ASYNC_REQUEST_CHANGE_PASSWORD: 'ASYNC_REQUEST_CHANGE_PASSWORD'
}

const INITIAL_STATE = {
    data: null,
    loaded: false,
    error: false,

    showModalPassword: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case types.REQUEST_MY_PROFILE_SUCCESS:
            return { ...state, loaded: true, error: false, data: action.payload };
        case types.REQUEST_MY_PROFILE_ERROR:
            return { ...state, loaded: true, error: true,data: null };
        case types.TOGGLE_MODAL_CHANGE_PASSWORD:
          return { ...state, showModalPassword: action.payload }
        default:
            return { ...state }
    }
}

export const loadUserProfile = () => ({ type: types.ASYNC_REQUEST_MY_PROFILE });

export const toggleModalPassword = visible => ({ type: types.TOGGLE_MODAL_CHANGE_PASSWORD, payload: visible });

export const changePassword = values => ({ type: types.ASYNC_REQUEST_CHANGE_PASSWORD, payload: values });
