import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './main.reducer';
import rootSaga from './main.saga';

export const configStore = (initialState, additionalMiddleware = []) => {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];

  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');
    const invariant = require('redux-immutable-state-invariant').default;

    middleware.push(invariant());
    middleware.push(createLogger({ collapsed: true }));
  }

  const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(...additionalMiddleware, ...middleware)));

  sagaMiddleware.run(rootSaga);

  return { store };
}