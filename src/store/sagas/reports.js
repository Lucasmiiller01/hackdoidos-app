import {all, takeLatest, call, put, select} from 'redux-saga/effects';
import {types} from '../ducks/reports';
import {types as createTypes} from '../ducks/createReports';
import * as services from '../../services/reports';

import {startSubmit, stopSubmit} from 'redux-form';
import { snackbarShowError, snackbarShowSuccess } from '../ducks/snackbar';

import { getUserLocation } from '../../services/auth';

function* getReports() {
  try {
    const {data} = yield call(services.allReports);

    if (!data.hasOwnProperty('alert')) {
      yield put({type: types.SET_REPORTS, payload: data});
    } else {
      yield put({type: types.SET_REPORTS, payload: []});
    }

    // yield put({ type: typesLayers.ASYNC_ADD_SELECTED_LAYER_BY_NAME, payload: action.payload });
  } catch (err) {
    //console.tron.log(err)
    //yield put({ type: types.LOGIN_ERROR });
  }
}

function* getMyReports() {
  try {
    const {data} = yield call(services.myReports);

    if (!data.hasOwnProperty('alert')) {
      yield put({type: types.SET_MY_REPORTS, payload: data});
    } else {
      yield put({type: types.SET_MY_REPORTS, payload: []});
    }
    // yield put({ type: typesLayers.ASYNC_ADD_SELECTED_LAYER_BY_NAME, payload: action.payload });
  } catch (err) {
    // console.tron.log(err)
    //yield put({ type: types.LOGIN_ERROR });
  }
}

function* fetchNewReport({payload}) {
  yield put(startSubmit('FORM_CREATE_REPORT'));

  try {
   // yield call(requestLocationPermission);
    let locationCoord = null;

    try {
      const location = yield call(getUserLocation);

      //const { latitude, longitude } = location.coords;
      locationCoord = location.coords;
     
    } catch (error) {
      yield put(
        snackbarShow(
          'Ocorreu um erro ao tentar recuperar localizaçao, por favor ative seu GPS.',
        ),
      );
      errorLocation = true;
    }

   /* const { data } = yield call(services.createReport, payload);

    if(data === 'error') {
      yield put(snackbarShowError('Ocorre um erro ao cadastrar a denuncia.'));
    } else {
      yield put(snackbarShowSuccess('Denuncia cadastrada com sucesso'));
      yield put(NavigationActions.navigate({ routeName: 'Main' }));

      yield all([
        put({ type: types.ASYNC_MY_REPORTS }),
        put({ type: types.ASYNC_REPORTS })
      ]);
    }*/

  } catch (err) {
    console.log(err.message);
    yield put(snackbarShowError('Ocorre um erro ao cadastrar a denuncia.'));
  } finally {
    yield put(stopSubmit('FORM_CREATE_REPORT'));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.ASYNC_REPORTS, getReports),
    takeLatest(types.ASYNC_MY_REPORTS, getMyReports),
    takeLatest(createTypes.ASYNC_CREATE_REPORT, fetchNewReport),
  ]);
}
