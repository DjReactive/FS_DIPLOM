import { put, retry, takeEvery, take, delay } from 'redux-saga/effects'
import { adminCfgRequest, adminCfgSuccess, adminCfgFailure } from '../actions'
import FetchData from '../api/fetch'
import { CFG_REQUEST, CFG_SUCCESS, CFG_FAILURE } from '../actions/actionTypes'

// watcher + worker
export function* watchAdminCfgRequestSaga() {
  yield takeEvery(CFG_REQUEST, function* ({payload}) {
    try {
      const response = yield retry(3, 500, FetchData, `/api/${payload.type}`);
      yield delay(1000);
      yield put(adminCfgSuccess(payload.type, response.data));
    } catch (e) {
      yield put(adminCfgFailure(payload.type, e.message));
    }
  });
}
