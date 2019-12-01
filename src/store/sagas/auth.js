import {all, takeLatest, call, put} from 'redux-saga/effects';
import {types} from '../ducks/auth';
import * as service from '../../services/auth';
import {startSubmit, stopSubmit} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import { PermissionsAndroid } from 'react-native';
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

    console.log(err)
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

/*function* requestLocationPermission() {
  try {

    console.log("STARTED")
    const granted = yield call(
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ),
    );

    console.log({ granted });

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const location = yield call(service.getUserLocation);

      console.log({ location })
      yield put({ type: types.INITIAL_POSITION_LOADED, payload: location.coord })
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log({ err })
    return false;
  }
}*/

export default function* rootSaga() {

 // yield call(requestLocationPermission)
  yield call(loadAuthenticate)

  yield all([
    takeLatest(types.ASYNC_LOGIN, login),
    takeLatest(types.ASYNC_LOAD_AUTHENTICATE, loadAuthenticate),
    takeLatest(types.ASYNC_LOGOUT, logout),
  ]);
}
