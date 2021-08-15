import React, { lazy } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

const Home = lazy(() => import('routes/home'));

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default withRouter(Routes);