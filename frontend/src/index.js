import React from 'react';
import ReactDOM from 'react-dom';
import VoidMain from './components/VoidMain';
import { Provider } from 'react-redux';
import Store from './components/Redux_Thunk/Store'


ReactDOM.render(
  <Provider store={Store}>
    <VoidMain />
  </Provider>,
  document.getElementById('root')
);

