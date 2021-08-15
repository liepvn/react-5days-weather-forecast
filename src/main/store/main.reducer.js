import { combineReducers } from 'redux';

import { homeReducer } from 'routes/home';

export default combineReducers({
  ...homeReducer
});