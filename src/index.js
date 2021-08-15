import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { configStore } from 'main/store';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

const { store } = configStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale='en'>
        <App />
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
