import {all, takeLatest, call, put} from 'redux-saga/effects';

import { Keyboard } from 'react-native'

import {types} from '../ducks/profile';
import * as service from '../../services/profile';
import {startSubmit, stopSubmit} from 'redux-form';

import {snackbarShowSuccess, snackbarShowError} from '../ducks/snackbar';

function* requestMyProfile() {
  try {
    const { data: profile } = yield call(service.requestProfile);
    yield put({type: types.REQUEST_MY_PROFILE_SUCCESS, payload: profile});
  } catch (err) {
    yield put({type: types.REQUEST_MY_PROFILE_ERROR});
  }
}

function* requestChangePassword({payload}) {
  yield put(startSubmit('FORM_CHANGE_PASSWORD'));
  Keyboard.dismiss();
  try {
    const { data } = yield call(service.requestChangePassword, payload);

    if(data.alert) {
      yield put(snackbarShowError(data.alert));
    } else {
      yield all([
        put(snackbarShowSuccess('Senha alterada com sucesso!')),
        put({ type: types.TOGGLE_MODAL_CHANGE_PASSWORD, payload: false })
      ]);
    }
  } catch (err) {
    yield put(snackbarShowError('Erro na tentativa de alterar a senha!'));
  } finally {
    yield put(stopSubmit('FORM_CHANGE_PASSWORD'));
  }
}

export default function* profileSaga() {
  yield all([
    takeLatest(types.ASYNC_REQUEST_MY_PROFILE, requestMyProfile),
    takeLatest(types.ASYNC_REQUEST_CHANGE_PASSWORD, requestChangePassword),
  ]);
}
