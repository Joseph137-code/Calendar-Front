import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import CalendarApp from './CalendarApp';

import { store } from './store/Storage'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <CalendarApp/>
  </Provider>,
  document.getElementById('root')
);
