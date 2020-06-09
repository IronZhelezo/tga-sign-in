import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import datafetched from './datafetched';
import app from './app';

export default combineReducers({
  routerReducer,
  datafetched,
  app
});
