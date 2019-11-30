import {all, takeLatest, call, put} from 'redux-saga/effects';
import {types} from '../ducks/auth';
import * as service from '../../services/auth';
import {startSubmit, stopSubmit} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {snackbarShowError, snackbarShow} from '../ducks/snackbar';

import { Keyboard } from 'react-native';

function* login(action) {
  yield put(startSubmit('LOGIN'));

  Keyboard.dismiss();

  try {
    const {data} = yield call(service.login, action.payload);
    yield call(service.setAuthStorage, data);
    yield all([
      put(stopSubmit('LOGIN')),
      put(snackbarShow('Login efetuado com sucesso.')),
      put({type: types.LOGIN_SUCCESS, payload: data}),
      put(NavigationActions.navigate({routeName: 'PrivateStack'})),
    ]);
  } catch (err) {
    yield all([
      put(snackbarShowError('Usuário e senha incorreto.')),
      put(stopSubmit('LOGIN')),
      put({type: types.LOGIN_ERROR}),
    ]);
  }
}

function* loadAuthenticate() {
  try {
    const data = yield call(service.getAuthStorage);
    if (data) {
      yield all([
        put({type: types.LOGIN_SUCCESS, payload: data}),
        put(NavigationActions.navigate({routeName: 'PrivateStack'})),
      ]);
    } else {
      yield all([
        put({type: types.LOGIN_SUCCESS, payload: {}}),
        put(NavigationActions.navigate({routeName: 'Login'})),
      ]);
    }
  } catch (err) {
    yield put(NavigationActions.navigate({routeName: 'Login'}));
  }
}

function* logout() {
  try {
    yield all([
      call(service.removeAuthStorage),
      put(NavigationActions.navigate({routeName: 'Login'})),
    ]);
  } catch (err) {
    yield put(NavigationActions.navigate({routeName: 'Login'}));
  }
}

export default function* rootSaga() {

  yield call(loadAuthenticate)

  yield all([
    takeLatest(types.ASYNC_LOGIN, login),
    takeLatest(types.ASYNC_LOAD_AUTHENTICATE, loadAuthenticate),
    takeLatest(types.ASYNC_LOGOUT, logout),
  ]);
}
