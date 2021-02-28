import React from 'react';
import ReactDOM from 'react-dom';
import VoidMain from './components/VoidMain';
import { Provider } from 'react-redux';
import Store from './components/Redux_Thunk/Store'
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={Store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <VoidMain />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);

