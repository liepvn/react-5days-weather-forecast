import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from 'main/routes';

import './App.style.scss';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router basename='/'>
        <Routes />
      </Router>
    </Suspense>
  );
}

export default App;
