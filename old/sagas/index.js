import { spawn } from 'redux-saga/effects'
import { watchAdminCfgRequestSaga } from './adminConfig'

export default function* saga() {
  // Admin Config
  yield spawn(watchAdminCfgRequestSaga);
}
