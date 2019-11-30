export const types = {
    ASYNC_ADD_SELECTED_LAYER_BY_NAME: "ASYNC_ADD_SELECTED_LAYER_BY_NAME",
    ASYNC_REMOVE_SELECTED_LAYER_BY_NAME: "ASYNC_REMOVE_SELECTED_LAYER_BY_NAME",
    ADD_SELECTED_SANITATION: "ADD_SELECTED_SANITATION",
    REMOVE_SELECTED_SANITATION: "REMOVE_SELECTED_SANITATION",
    ADD_SELECTED_REPORTS: "ADD_SELECTED_REPORTS",
    REMOVE_SELECTED_REPORTS: "REMOVE_SELECTED_REPORTS",
    ADD_SELECTED_RELEASEPOINTS: "ADD_SELECTED_RELEASEPOINTS",
    REMOVE_SELECTED_RELEASEPOINTS: "REMOVE_SELECTED_RELEASEPOINTS",
    ADD_SELECTED_CONDOS: "ADD_SELECTED_CONDOS",
    REMOVE_SELECTED_CONDOS: "REMOVE_SELECTED_CONDOS",
    ADD_SELECTED_TREATMENTSTATIONS: "ADD_SELECTED_TREATMENTSTATIONS",
    REMOVE_SELECTED_TREATMENTSTATIONS: "REMOVE_SELECTED_TREATMENTSTATIONS"

}

const INITIAL_STATE = {
    sanitation: [],
    reports: [],
    releasePoints: [],
    pointsCondos: [],
    treatmentStations: []

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.ADD_SELECTED_SANITATION:
            return { ...state, sanitation: action.payload };

        case types.REMOVE_SELECTED_SANITATION:
            return { ...state, sanitation: [] };

        case types.ADD_SELECTED_REPORTS:
            return { ...state, reports: action.payload };

        case types.REMOVE_SELECTED_REPORTS:
            return { ...state, reports: [] };
        case types.ADD_SELECTED_RELEASEPOINTS:
            return { ...state, releasePoints: action.payload };

        case types.REMOVE_SELECTED_RELEASEPOINTS:
            return { ...state, releasePoints: [] };
        case types.ADD_SELECTED_CONDOS:
            return { ...state, pointsCondos: action.payload };

        case types.REMOVE_SELECTED_CONDOS:
            return { ...state, pointsCondos: [] };

        case types.ADD_SELECTED_CONDOS:
            return { ...state, pointsCondos: action.payload };

        case types.REMOVE_SELECTED_CONDOS:
            return { ...state, pointsCondos: [] };

        case types.ADD_SELECTED_TREATMENTSTATIONS:
            return { ...state, treatmentStations: action.payload };

        case types.REMOVE_SELECTED_TREATMENTSTATIONS:
            return { ...state, treatmentStations: [] };


        default:
            return { ...state }
    }
}

export const addLayer = (payload) => ({ type: types.ASYNC_ADD_SELECTED_LAYER_BY_NAME, payload });
export const removeLayer = (payload) => ({ type: types.ASYNC_REMOVE_SELECTED_LAYER_BY_NAME, payload });

