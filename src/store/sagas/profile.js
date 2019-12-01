import {all, takeLatest, call, put} from 'redux-saga/effects';


import {types} from '../ducks/profile';
import * as service from '../../services/profile';


function* requestMyProfile() {
  try {
    const { data: profile } = yield call(service.requestProfile);
    yield put({type: types.REQUEST_MY_PROFILE_SUCCESS, payload: profile});
  } catch (err) {
    yield put({type: types.REQUEST_MY_PROFILE_ERROR});
  }
}



export default function* profileSaga() {
  yield all([
    takeLatest(types.ASYNC_REQUEST_MY_PROFILE, requestMyProfile),
  ]);
}
