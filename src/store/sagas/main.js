import { all, takeLatest, call, put, select, takeEvery } from 'redux-saga/effects';
import { types } from '../ducks/main';
import { types as typesLayers } from '../ducks/layers'
//import { snackbarShowError, snackbarShow } from "../ducks/snackbar";

function* addLayer(action) {
    try {
        yield put({ type: types.ADD_SELECTED_LAYER, payload: action.payload });
        yield put({ type: typesLayers.ASYNC_ADD_SELECTED_LAYER_BY_NAME, payload: action.payload });
    } catch (err) {
        //  console.tron.log(err)
        //yield put({ type: types.LOGIN_ERROR });
    }
}


function* removeLayer(action) {
    try {
        yield put({ type: types.REMOVE_SELECTED_LAYER, payload: action.payload });
        yield put({ type: typesLayers.ASYNC_REMOVE_SELECTED_LAYER_BY_NAME, payload: action.payload });

    } catch (err) {
        //yield put({ type: types.LOGIN_ERROR });
    }
}
export default function* profileSaga() {
    yield all([
        takeEvery(types.ASYNC_ADD_SELECTED_LAYER, addLayer),
        takeEvery(types.ASYNC_REMOVE_SELECTED_LAYER, removeLayer)
    ]);
}
