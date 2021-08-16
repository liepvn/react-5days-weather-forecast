import { combineReducers } from 'redux';

import { homeReducer } from 'routes/home';

/**
 * rootReducer
 */
export default combineReducers({
  ...homeReducer
});