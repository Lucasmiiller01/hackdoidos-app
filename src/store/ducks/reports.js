export const types = {
    ASYNC_REPORTS: 'ASYNC_REPORTS',
    SET_REPORTS: 'SET_REPORTS'
}

const INITIAL_STATE = {
    data: [],
    loaded: false,
    error: false,
    occurrences: [],
    loadedOccurrences: false,
    errorOccurrences: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_REPORTS:
            return { ...state, loaded: true, error: false, data: action.payload };
        case types.GET_REPORTS_ERROR:
            return { ...state, loaded: true, error: true };
    
        default:
            return { ...state }
    }
}

export const getReports = () => ({ type: types.ASYNC_REPORTS });


