import {all} from 'redux-saga/effects';
import profileSaga from './profile';
import authSaga from './auth';
import mainSaga from './main';
import reportsSaga from './reports';

export default function* rootSaga() {
  yield all([
    authSaga(),
    profileSaga(),
    mainSaga(),
    reportsSaga(),
  ]);
}
