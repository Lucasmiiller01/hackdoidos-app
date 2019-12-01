export const types = {
    ASYNC_LOGIN: 'ASYNC_LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    ASYNC_LOAD_AUTHENTICATE: "ASYNC_LOAD_AUTHENTICATE",
    ASYNC_LOGOUT: "ASYNC_LOGOUT",

    INITIAL_POSITION_LOADED: 'INITIAL_POSITION_LOADED'
}

const INITIAL_STATE = {
    data: null,
    loaded: false,
    error: false,

    initialPosition: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return { ...state, loaded: true, error: false, data: action.payload };
        case types.LOGIN_ERROR:
            return { ...state, loaded: true, error: true };
        case types.INITIAL_POSITION_LOADED:
            return { ...state, initialPosition: action.payload };
        default:
            return { ...state }
    }
}

export const login = (payload) => ({ type: types.ASYNC_LOGIN, payload });

export const loadAuth = () => ({ type: types.ASYNC_LOAD_AUTHENTICATE });

export const logout = () => ({ type: types.ASYNC_LOGOUT });
