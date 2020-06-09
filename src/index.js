import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import rootReducer from "ducks/index";
import App from './containers/app/App';
import * as serviceWorker from './serviceWorker';

const isDev = process.env.NODE_ENV === "development";

const history = createBrowserHistory();

const middlewares = [thunk, apiMiddleware, routerMiddleware(history)];

if (isDev) middlewares.push(createLogger({ collapsed: true }));

const middleware = applyMiddleware(...middlewares);

const configStore = (initialState = {}) => createStore(
  rootReducer,
  initialState,
  compose(middleware)
);

const store = configStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register(); // change to unregister() after deploy to prod
