import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { configStore } from 'main/store';
import { Provider } from 'react-redux';

function render(ui, { locale = 'en', ...options } = {}) {
  const { redux: { actions = [], mockDispatch, initialState = {}, integration = false } = {}, ...rest } = options;
  const middleware = [];

  middleware.push(() => next => action => {
    mockDispatch?.(action);

    integration && next(action);
  });

  const { store } = configStore(initialState, middleware);

  actions.forEach(d => store.dispatch(d));

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <IntlProvider locale={locale}>{children}</IntlProvider>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...rest });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
