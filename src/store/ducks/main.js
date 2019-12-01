export const types = {
    CHANGE_MODAL_DRAWER: 'CHANGE_MODAL_DRAWER',
    ASYNC_ADD_SELECTED_LAYER: "ASYNC_ADD_SELECTED_LAYER",
    ASYNC_REMOVE_SELECTED_LAYER: "ASYNC_REMOVE_SELECTED_LAYER",
    ADD_SELECTED_LAYER: "ADD_SELECTED_LAYER",
    ASYNC_GET_ALL_POSTS: "ASYNC_GET_ALL_POSTS",
    REMOVE_SELECTED_LAYER: "REMOVE_SELECTED_LAYER"

}

const INITIAL_STATE = {
    openModal: false,
    layers: [],
    postsPointsData: [{lat: -22.880181, lng: -43.231250}]
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.CHANGE_MODAL_DRAWER:
            return { ...state, openModal: action.payload };
        case types.ADD_SELECTED_LAYER:

            return {
                ...state, layers: state.layers.concat(action.payload)
            };
        case types.REMOVE_SELECTED_LAYER:
            return {
                ...state, layers: state.layers.filter(function (value) {
                    return value !== action.payload;
                })
            };
        default:
            return { ...state }
    }
}

export const changeModal = payload => ({ type: types.CHANGE_MODAL_DRAWER, payload });
export const getAllPoints = payload => ({ type: types.CHANGE_MODAL_DRAWER, payload });

export const addLayer = payload => ({ type: types.ASYNC_ADD_SELECTED_LAYER, payload });
export const removeLayer = payload => ({ type: types.ASYNC_REMOVE_SELECTED_LAYER, payload });

