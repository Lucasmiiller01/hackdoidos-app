import { all, takeLatest, call, put, select, takeEvery } from 'redux-saga/effects';
import { types } from '../ducks/layers';
import * as services from '../../services/layers'

function* addLayer(action) {
    try {
        const { data } = yield call(services.getLayerByName, action.payload);
        // console.tron.log(data, data.coords, action.payload)
        switch (action.payload) {
            case "saneamento":
                //const dataReformat = data.coords.map(item => console.tron.log(item["Concluido"]))
                yield put({ type: types.ADD_SELECTED_SANITATION, payload: data && data.coords ? data.coords : [] });
                break;
            case "reports":
                yield put({ type: types.ADD_SELECTED_REPORTS, payload: data && data.coords ? data.coords : [] });
                break;
            case "pontos_de_lancamento":
                yield put({ type: types.ADD_SELECTED_RELEASEPOINTS, payload: data && data.coords ? data.coords : [] });
                break;
            case "pontos_completo_e_bairros":
                yield put({ type: types.ADD_SELECTED_CONDOS, payload: data && data.coords ? data.coords : [] });
                break;
            case "estacoestratamento_elevatoria":
                yield put({ type: types.ADD_SELECTED_TREATMENTSTATIONS, payload: data && data.coords ? data.coords : [] });

                break;
            default:
                break;
        }
    } catch (err) {
        //  console.tron.log(err)

        //yield put({ type: types.LOGIN_ERROR });
    }
}


function* removeLayer(action) {
    switch (action.payload) {
        case "saneamento":
            yield put({ type: types.REMOVE_SELECTED_SANITATION });
            break;
        case "reports":
            yield put({ type: types.REMOVE_SELECTED_REPORTS });
            break;

        case "pontos_de_lancamento":
            yield put({ type: types.REMOVE_SELECTED_RELEASEPOINTS });
            break;
        case "pontos_completo_e_bairros":
            yield put({ type: types.REMOVE_SELECTED_CONDOS });
            break;
        case "estacoestratamento_elevatoria":
            yield put({ type: types.REMOVE_SELECTED_TREATMENTSTATIONS });
            break;

    }
}
export default function* rootSaga() {
    yield all([
        takeEvery(types.ASYNC_ADD_SELECTED_LAYER_BY_NAME, addLayer),
        takeEvery(types.ASYNC_REMOVE_SELECTED_LAYER_BY_NAME, removeLayer)
    ]);
}
