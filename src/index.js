import React from 'react';
import { render } from 'react-dom';
import { Provider, connect, mapStateToProps, mapDispatchToProps } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';


import { getStore, history } from './store';
import getRoutes from './routes/index';

const routes = getRoutes();

render(
  <Provider store={getStore()}>
    <ConnectedRouter history={history}>
      {routes}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

module.hot.accept();