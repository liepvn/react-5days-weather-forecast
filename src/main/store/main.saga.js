import { all, fork } from 'redux-saga/effects';

import { homeSaga } from 'routes/home';

/**
 * rootSaga
 */
 export default function* root() {
  yield all([fork(homeSaga)]);
}