import produce from 'immer';

/**
 * Create an action
 */
export function createAction(type, payloadCreator) {
  if (!payloadCreator) {
    throw new TypeError('Expected a function');
  }

  return (...args) => ({
    type,
    payload: payloadCreator(...args),
  });
}

/**
 * Create a reducer
 */
 export function createReducer(
  actionsMap,
  defaultState,
) {
  return (state = defaultState, action) =>
    produce(state, (draft) => {
      const fn = actionsMap[action.type];

      if (fn) {
        return fn(draft, action);
      }

      return draft;
    });
}