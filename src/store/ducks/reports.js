export const types = {
    ASYNC_REPORTS: 'ASYNC_REPORTS',
    SET_REPORTS: 'SET_REPORTS',
    ASYNC_HOSPITAL: 'ASYNC_HOSPITAL',
    SET_HOSPITAL: 'SET_HOSPITAL'
}

const INITIAL_STATE = {
    data: [],
    loaded: false,
    error: false,
    occurrences: [],
    loadedOccurrences: false,
    errorOccurrences: false,
    dataHospital: [],
    loadedHospital: false,
    errorHospital: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_REPORTS:
            return { ...state, loaded: true, error: false, data: action.payload };

        case types.SET_HOSPITAL:
                return { ...state, loadedHospital: true, errorHospital: false, dataHospital: action.payload };

        default:
            return { ...state }
    }
}

export const getReports = () => ({ type: types.ASYNC_REPORTS });

export const getHospital = () => ({ type: types.ASYNC_HOSPITAL });

