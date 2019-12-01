import {all, takeLatest, call, put, select} from 'redux-saga/effects';
import {types} from '../ducks/reports';
import {types as createTypes} from '../ducks/createReports';
import * as services from '../../services/reports';

import {startSubmit, stopSubmit} from 'redux-form';
import { snackbarShowError, snackbarShowSuccess } from '../ducks/snackbar';

import { getUserLocation } from '../../services/auth';
import { NavigationActions } from 'react-navigation';

function* getReports() {
  try {
    const {data} = yield call(services.allReports);

    if (data && data.events) {
      yield put({type: types.SET_REPORTS, payload: data.events});
    } else {
      yield put({type: types.SET_REPORTS, payload: []});
    }

  } catch (err) {}
}

function* getHospital() {
  try {
    const {data} = yield call(services.allReports);

    if (data && data.events) {
      yield put({type: types.SET_REPORTS, payload: data.events});
    } else {
      yield put({type: types.SET_REPORTS, payload: []});
    }

  } catch (err) {}
}

function* fetchNewReport({payload}) {
  yield put(startSubmit('FORM_CREATE_REPORT'));


  try {
    let locationCoord = null;

    try {
      const location = yield call(getUserLocation);

      const { latitude, longitude } = location.coords;
      locationCoord = { lat: latitude, lng: longitude };
     
    } catch (error) {
      yield put(
        snackbarShow( 'Ocorreu um erro ao tentar recuperar localizaçao, por favor ative seu GPS.', ),
      );
    }
    yield call(services.createReport, { ...locationCoord, ...payload });

    yield all([
      
      put(snackbarShowSuccess('Ocorrencia criada com sucesso')),
      put(NavigationActions.navigate({ routeName: 'CreateOccurrenceCamera' }))
    ]);

  } catch (err) {
    yield put(snackbarShowError('Ocorre um erro ao cadastrar a ocorrencia.'));
  } finally {
    yield put(stopSubmit('FORM_CREATE_REPORT'));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.ASYNC_REPORTS, getReports),
    takeLatest(types.ASYNC_HOSPITAL, getHospital),
    takeLatest(createTypes.ASYNC_CREATE_REPORT, fetchNewReport),
  ]);
}
