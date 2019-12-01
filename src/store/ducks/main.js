export const types = {
    ASYNC_GET_ALL_POSTS: "ASYNC_GET_ALL_POSTS",
}

const INITIAL_STATE = {
    postsPointsData: [{lat: -22.880181, lng: -43.231250}]
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
     
        default:
            return { ...state }
    }
}

export const getAllPoints = payload => ({ type: types.CHANGE_MODAL_DRAWER, payload });



