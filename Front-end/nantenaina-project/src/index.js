import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagamiddleware from 'redux-saga';


import {watchArtistes} from './store/saga/index';


import reducer from './store/reducer/index';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const sagaMiddleware = createSagamiddleware();

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(watchArtistes);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app , document.getElementById('root'));